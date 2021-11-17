import {AfterViewInit, Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SymfonyApiClientService} from '../../../core/services/symfony-api/symfony-api-client.service';
import {WebDetailResolverService} from '../../../../admin/entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {of} from 'rxjs';
import {MatTreeService} from '../../../core/services/mat-tree.service';
import {FlatDirectoryTreeInterface} from '../../interfaces/flat-directory-tree-interface';


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
export class FileManagerComponent implements AfterViewInit {

  directoryTreeSource: DirectoryTreeInterface[];
  dataSource: any = [];
  hasDirectoryChild;
  treeControl;
  flatTreeNode: Map<string, FlatDirectoryTreeInterface>;
  currentPath: string;

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private webDetailResolverService: WebDetailResolverService,
    private matTreeService: MatTreeService<DirectoryTreeInterface, FlatDirectoryTreeInterface>
  ) {
    this.hasDirectoryChild = matTreeService.getHasDirectoryChildCallback();
    this.treeControl = matTreeService.getDirectoryTreeControl();
  }

  ngAfterViewInit() {
    setTimeout(() => {
       this.loadDirectoryTree();

    }, 1000);
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
    };
    of(TREE_DATA).subscribe(value => {
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.matTreeService.getTreeFlattener(transformerToFlat));
      this.dataSource.data = value;
    });

    // this.symfonyApiClientService.get<DirectoryTreeInterface>('directory_tree_read', [this.webDetailResolverService.webDetail.id])
    //   .subscribe(response => {
    //     this.dataSource = new MatTreeFlatDataSource(this.treeControl,
    //       DirectoryTreeFlattenerHelper.getMatTreeFlattener());
    //     this.dataSource.data = response.body;
    // });
  }

  changeDirectoryFromTree(node: FlatDirectoryTreeInterface) {
    this.currentPath = node.fullPath;
  }

}
