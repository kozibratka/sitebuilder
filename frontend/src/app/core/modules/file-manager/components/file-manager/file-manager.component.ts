import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeModule} from '@angular/material/tree';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {FlatDirectoryTreeInterface} from '../../interfaces/flat-directory-tree-interface';
import {fromEvent, merge, Observable, Subscription, timer} from 'rxjs';
import {debounce, finalize, map, tap} from 'rxjs/operators';
import {FileInfoInterface} from '../../interfaces/file-info-interface';
import {faCoffee, faFolder, faUpload} from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {LargeItemComponent} from './large-item/large-item.component';
import {FlatTreeControl} from '@angular/cdk/tree';
import {HttpEventType} from '@angular/common/http';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import * as _ from 'lodash';
import {DragToSelectModule, SelectContainerComponent} from 'ngx-drag-to-select';
import {HttpResponseToasterService} from '../../../../services/http-response-toaster.service';
import {ContextMenuRootDirective} from '../../../context-menu/directives/context-menu-root.directive';
import {SymfonyApiClientService} from '../../../../services/api/symfony-api/symfony-api-client.service';
import {MatTreeService} from '../../../../services/mat-tree.service';
import {ContextMenuService} from '../../../context-menu/services/context-menu.service';
import {NotifierService} from '../../../../services/notifier.service';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  DirectoryMiniNavigationComponent
} from "../../../../components/directory-mini-navigation/directory-mini-navigation.component";
import {ContextMenuItemDirective} from "../../../context-menu/directives/context-menu-item.directive";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {ArrayHelper} from "../../../../helpers/array-helper";

@Component({
  selector: 'app-file-manager',
  standalone: true,
  templateUrl: './file-manager.component.html',
  imports: [
    CommonModule,
    MatTreeModule,
    MatButton,
    MatIconButton,
    MatIcon,
    DirectoryMiniNavigationComponent,
    ContextMenuRootDirective,
    ContextMenuItemDirective,
    DragToSelectModule,
    LargeItemComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FaIconComponent
  ],
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {

  @ViewChild('createDirectoryTemplate') createDirectoryTemplate: TemplateRef<any>;
  @ViewChild('uploadProgressTemplate') uploadProgressTemplate: TemplateRef<any>;
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  @ViewChildren(LargeItemComponent) files: QueryList<LargeItemComponent>;
  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
  private _lastSelectedFile: LargeItemComponent = null;
  selectedItems: LargeItemComponent[];
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
  searchInputSubscription: Subscription;
  uploadProgress = 0;
  uploadSub: Subscription;
  uploadMessage = '';
  private _orderBy: ('type' | 'name' | 'size' | 'modified')[] = ['type', 'name'];
  private _orderByOrder: 'asc' | 'desc' = 'asc';

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private matTreeService: MatTreeService<DirectoryTreeInterface, FlatDirectoryTreeInterface>,
    public viewContainerRef: ViewContainerRef,
    private contextMenuService: ContextMenuService,
    public dialog: MatDialog,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
    private snackBar: MatSnackBar
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
        let data = response.body;
        ArrayHelper.sortTree(data as any);
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
          let resp = response.body;
          resp = _.orderBy(resp, this._orderBy, [this._orderByOrder]);

          return resp;
        })
      );
  }

  registerSearchFiles() {
    const keyUpEvent = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup');
    const searchEvent = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'search');
    this.searchInputSubscription = merge(keyUpEvent, searchEvent).pipe(
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
    this._lastSelectedFile = selectedItem;
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
    let firstRun = true;
    let snack: MatSnackBarRef<any>;
    formData.append('path', this.currentPath);
    const upload$ = this.symfonyApiClientService.post('user_storage_upload_files', formData, null, {}, {
      reportProgress: true,
      observe: 'events'
    } ).pipe(
      finalize(() => {firstRun = false; this.snackDismiss(snack); this.reloadContent(); })
    );
    upload$.subscribe((value: any) => {
      if (firstRun) {
        snack = this.snackBar.openFromTemplate(this.uploadProgressTemplate);
        firstRun = false;
      }
      if (value.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (value.loaded / value.total));
      } else if (value.type === HttpEventType.Response) {
        this.uploadMessage = 'Nahráno';
      }
    }, error => {
      this.uploadMessage = 'Některé soubory se nepodařilo nahrát';
    });
  }

  removeFiles() {
    this.symfonyApiClientService.post('user_storage_remove_files', {path: this.currentPath, files: this.selectedItems.map(value => value.file.name)}).
    subscribe(value => {
      this.reloadAreas();
      this.notifierService.notify('Soubory smazány');
    });
  }

  snackDismiss(snack: MatSnackBarRef<any>) {
    setTimeout(() => snack.dismiss(), 2000);
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  get orderByOrder(): 'asc' | 'desc' {
    return this._orderByOrder;
  }

  set orderByOrder(value: 'asc' | 'desc') {
    this._orderByOrder = value;
    this.reloadContent();
  }


  get orderBy(): any {
    return this._orderBy;
  }

  set orderBy(value: any) {
    this._orderBy = value;
    this.reloadContent();
  }


  get lastSelectedFile(): LargeItemComponent {
    return this._lastSelectedFile;
  }

  set lastSelectedFile(value: LargeItemComponent) {
    this.selectContainer.selectItems(item => item === value);
    this._lastSelectedFile = value;
  }
}
