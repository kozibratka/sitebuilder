import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  HostListener,
  OnInit, QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeNode} from '@angular/material/tree';
import {SymfonyApiClientService} from '../../../core/services/symfony-api/symfony-api-client.service';
import {WebDetailResolverService} from '../../../../admin/entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {MatTreeService} from '../../../core/services/mat-tree.service';
import {FlatDirectoryTreeInterface} from '../../interfaces/flat-directory-tree-interface';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {filter, last, map, take} from 'rxjs/operators';
import {FileInfoInterface} from '../../interfaces/file-info-interface';
import { faCoffee, faFolder, faUpload } from '@fortawesome/free-solid-svg-icons';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatMenu} from '@angular/material/menu';
import {ContextMenuService} from '../../../context-menu/services/context-menu.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {LargeItemComponent} from './large-item/large-item.component';
import {FlatTreeControl} from '@angular/cdk/tree';


const TREE_DATA: any[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  }
];

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild('createDirectoryTemplate') createDirectoryTemplate: TemplateRef<any>;
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
  overlayRef: OverlayRef | null;
  clickOutsideContextMenuSubscription: Subscription;
  searchValue = '';

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private webDetailResolverService: WebDetailResolverService,
    private matTreeService: MatTreeService<DirectoryTreeInterface, FlatDirectoryTreeInterface>,
    private overlay: Overlay,
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
  }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {
    this.reloadAreas();
  }

  @HostListener('click')
  click() {
      this.files.forEach(item => {
        if ((this.lastSelectedFile && item !== this.lastSelectedFile) || !this.lastSelectedFile) {
          item.selected = false;
        }
      });
      this.lastSelectedFile = null;
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

  openContextMenu2(mouseEvent: MouseEvent, matMenu: MatMenu) {
    this.contextMenuService.showMenu(mouseEvent, matMenu, this.viewContainerRef);
  }

  openContextMenu(mouseEvent: MouseEvent, menuTemplate: TemplateRef<any>) {
    this.closeContextMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x: mouseEvent.x, y: mouseEvent.y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(menuTemplate, this.viewContainerRef));
    this.clickOutsideContextMenuSubscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeContextMenu());
  }

  closeContextMenu() {
    if (this.clickOutsideContextMenuSubscription) {
      this.clickOutsideContextMenuSubscription.unsubscribe();
    }
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  createDirectoryDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef).afterClosed().subscribe(value => {
      if (value) {
        this.symfonyApiClientService.post('user_storage_directory_create', {path: this.currentPath, name: value}).subscribe({
          next: value1 => {
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
}
