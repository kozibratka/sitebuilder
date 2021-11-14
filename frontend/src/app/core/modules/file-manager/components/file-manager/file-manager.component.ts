import {AfterViewInit, Component} from '@angular/core';
import {MatTreeFlatDataSource} from '@angular/material/tree';
import {SymfonyApiClientService} from '../../../../services/symfony-api/symfony-api-client.service';
import {WebDetailResolverService} from '../../../../../admin/entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {DirectoryTreeInterface} from '../../interfaces/directory-tree-interface';
import {DirectoryTreeFlattenerHelper} from '../../helpers/directory-tree-flattener-helper';
import {of} from 'rxjs';


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
  hasDirectoryChild = DirectoryTreeFlattenerHelper.getHasDirectoryChildCallback();
  treeControl = DirectoryTreeFlattenerHelper.getDirectoryTreeControl();

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private webDetailResolverService: WebDetailResolverService
  ) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
       this.loadDirectoryTree();

    }, 1000);
  }

  loadDirectoryTree() {
    // this.symfonyApiClientService.get<DirectoryTreeInterface>('directory_tree_read', [this.webDetailResolverService.webDetail.id])
    //   .subscribe(response => {
    //     this.dataSource = new MatTreeFlatDataSource(this.treeControl,
    //       DirectoryTreeFlattenerHelper.getMatTreeFlattener());
    //     this.dataSource.data = response.body;
    // });
    of(TREE_DATA).subscribe(value => {
          this.dataSource = new MatTreeFlatDataSource(this.treeControl,
            DirectoryTreeFlattenerHelper.getMatTreeFlattener());
          this.dataSource.data = value;
    });
  }

}
