import {AfterViewChecked, AfterViewInit, Component, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {MatTreeFlatDataSource} from '@angular/material/tree';
import {SymfonyApiClientService} from '../../../core/services/symfony-api/symfony-api-client.service';
import {WebDetailResolverService} from '../../../../admin/entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {MatTreeService} from '../../../core/services/mat-tree.service';
import {FlatDirectoryTreeInterface} from '../../interfaces/flat-directory-tree-interface';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {FileInfoInterface} from '../../interfaces/file-info-interface';
import { faCoffee, faFolder } from '@fortawesome/free-solid-svg-icons';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatMenu} from '@angular/material/menu';
import {ContextMenuService} from '../../../context-menu/services/context-menu.service';


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

  directoryTreeSource: DirectoryTreeInterface[];
  dataSource: any = [];
  hasDirectoryChild;
  treeControl;
  flatTreeNode = new Map<string, FlatDirectoryTreeInterface>();
  currentPath = '/';
  currentPathContent: Observable<FileInfoInterface[]> = null;
  icons = {faCoffee, faFolder};
  selectedTreeNode = null;
  overlayRef: OverlayRef | null;
  clickOutsideContextMenuSubscription: Subscription;

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private webDetailResolverService: WebDetailResolverService,
    private matTreeService: MatTreeService<DirectoryTreeInterface, FlatDirectoryTreeInterface>,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private contextMenuService: ContextMenuService
  ) {
    this.hasDirectoryChild = matTreeService.getHasDirectoryChildCallback();
    this.treeControl = matTreeService.getDirectoryTreeControl();
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {
    this.loadDirectoryTree();
    this.reloadContent();
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

}
