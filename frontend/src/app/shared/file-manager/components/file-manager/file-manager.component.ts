import {
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef,
  HostListener, OnDestroy,
  OnInit, QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MatTreeFlatDataSource} from '@angular/material/tree';
import {SymfonyApiClientService} from '../../../core/services/symfony-api/symfony-api-client.service';
import {WebDetailResolverService} from '../../../../admin/entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {MatTreeService} from '../../../core/services/mat-tree.service';
import {FlatDirectoryTreeInterface} from '../../interfaces/flat-directory-tree-interface';
import {fromEvent, Observable, Subscription, timer} from 'rxjs';
import {debounce, filter, finalize, map, take, tap} from 'rxjs/operators';
import {FileInfoInterface} from '../../interfaces/file-info-interface';
import { faCoffee, faFolder, faUpload } from '@fortawesome/free-solid-svg-icons';
import {ContextMenuService} from '../../../context-menu/services/context-menu.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {LargeItemComponent} from './large-item/large-item.component';
import {FlatTreeControl} from '@angular/cdk/tree';
import {ContextMenuRootDirective} from '../../../context-menu/directives/context-menu-root.directive';
import {HttpEventType, HttpResponseBase} from '@angular/common/http';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  @ViewChild('createDirectoryTemplate') createDirectoryTemplate: TemplateRef<any>;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  @ViewChildren(LargeItemComponent) files: QueryList<LargeItemComponent>;
  lastSelectedFile: LargeItemComponent = null;
  directoryTreeSource: DirectoryTreeInterface[];
  dataSource: any = [];
  hasDirectoryChild;
  treeControl: FlatTreeControl<FlatDirectoryTreeInterface>;
  flatTreeNode = new Map<string, FlatDirectoryTreeInterface>();
  currentPath = '';
  currentPathContent: Observable<FileInfoInterface[]> = null;
  icons = {faCoffee, faFolder, faUpload};
  selectedTreeNode = null;
  clickOutsideContextMenuSubscription: Subscription;
  searchValue = '';
  searchInputSubscription: Subscription;
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private webDetailResolverService: WebDetailResolverService,
    private matTreeService: MatTreeService<DirectoryTreeInterface, FlatDirectoryTreeInterface>,
    public viewContainerRef: ViewContainerRef,
    private contextMenuService: ContextMenuService,
    public dialog: MatDialog,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService
  ) {
    this.hasDirectoryChild = matTreeService.getHasDirectoryChildCallback();
    this.treeControl = matTreeService.getDirectoryTreeControl();
  }

  ngOnInit() {
    this.registerSearchFiles();
  }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {
    this.reloadAreas();
  }

  ngOnDestroy() {
    if (this.searchInputSubscription) {
      this.searchInputSubscription.unsubscribe();
    }
  }

  @HostListener('click')
  click() {
      this.unselectedNotSelectedItems();
      this.lastSelectedFile = null;
  }

  unselectedNotSelectedItems() {
    this.files.forEach(item => {
      if ((this.lastSelectedFile && item !== this.lastSelectedFile) || !this.lastSelectedFile) {
        item.selected = false;
      }
    });
  }

  loadDirectoryTree() {
    this.flatTreeNode.clear();
    const transformerToFlat = (node: DirectoryTreeInterface, level: number) => {
      const flatNode = {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
        fullPath: node.fullPath,
        children: []
      };
      this.flatTreeNode.set(node.fullPath, flatNode);
      return flatNode;
    };
    this.symfonyApiClientService.get<DirectoryTreeInterface>('user_storage_directory_tree')
      .subscribe(response => {
        this.dataSource = new MatTreeFlatDataSource(this.treeControl,
          this.matTreeService.getTreeFlattener(transformerToFlat));
        this.dataSource.data = response.body;
        this.treeControl.expand(this.flatTreeNode.get(''));
      });
  }

  changeDirectoryFromTree(node: FlatDirectoryTreeInterface) {
    this.currentPath = node.fullPath;
    this.reloadContent();
    this.selectedTreeNode = node;
  }

  reloadContent() {
    this.currentPathContent = this.symfonyApiClientService.post<FileInfoInterface[]>('user_storage_directory_content',
      {path: this.currentPath})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  registerSearchFiles() {
    this.searchInputSubscription = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup').pipe(
        debounce(() => timer(1000)),
        tap(value => {
          if (!!!value) {
            this.reloadContent();
            return;
          }
          this.currentPathContent = this.symfonyApiClientService.post<FileInfoInterface[]>('user_storage_directory_search',
            {term: (value.target as HTMLInputElement).value, path: this.currentPath})
            .pipe(
              map(response => {
                return response.body;
              })
            );
        })
    ).subscribe();
  }

  openContextMenu2(target: MouseEvent, menu: ContextMenuRootDirective) {
    this.contextMenuService.open({targetElement: target, containerRef: this.viewContainerRef, subMenu: menu}, true);
  }

  openContextMenuItem(target: MouseEvent, menu: ContextMenuRootDirective, selectedItem: LargeItemComponent) {
    this.lastSelectedFile = selectedItem;
    this.unselectedNotSelectedItems();
    this.contextMenuService.open({targetElement: target, containerRef: this.viewContainerRef, subMenu: menu}, true);
  }

  createDirectoryDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef).afterClosed().subscribe(value => {
      if (value) {
        this.symfonyApiClientService.post('user_storage_directory_create', {path: this.currentPath, name: value}).subscribe({
          next: () => {
            this.notifierService.notify('Adresář byl úspěšně vytvořen');
            this.reloadAreas();
          },
          error: err => {
             this.httpResponseToasterService.showError(err); }
        });
      }
    });
  }

  reloadAreas() {
    this.reloadContent();
    this.loadDirectoryTree();
  }

  changeCurrentPath(path: string, addPath = false) {
    this.currentPath = addPath ? (this.currentPath + '/' + path).replace(/^\//, '') : path;
    this.reloadContent();
    this.treeControl.dataNodes.forEach(value => {
      if (value.fullPath === this.currentPath) {
        this.treeControl.expand(value);
        this.matTreeService.getParents(value).forEach(value1 => {
          this.treeControl.expand(value1);
        });
        this.selectedTreeNode = value;
      }
    });
  }

  uploadFiles(event) {
    const formData = new FormData();
    let index = 0;
    for (const file of event.target.files as File[]) {
      formData.append((index++).toString(), file);
    }
    const upload$ = this.symfonyApiClientService.post('user_storage_upload_files', formData, null, {}, {
      reportProgress: true,
      observe: 'events'
    } ).pipe(
      finalize(() => this.reset())
    );
    upload$.subscribe((value: any) => {
      if (value.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (value.loaded / value.total));
      }
    });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
