import {MatTreeFlattener} from '@angular/material/tree';
import {DirectoryTreeInterface} from '../interfaces/directory-tree-interface';
import {FlatDirectoryTreeInterface} from '../interfaces/flat-directory-tree-interface';
import {FlatTreeControl} from '@angular/cdk/tree';

export class DirectoryTreeFlattenerHelper {

  static getMatTreeFlattener() {
    const transformerToFlat = (node: DirectoryTreeInterface, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
        fullPath: node.fullPath
      };
    };

    return new MatTreeFlattener<DirectoryTreeInterface, FlatDirectoryTreeInterface>(
      transformerToFlat,
      node => node.level,
      node => node.expandable,
      node => node.children,
    );
  }

  static getDirectoryTreeControl() {
    return new FlatTreeControl<FlatDirectoryTreeInterface>(
      node => node.level,
      node => node.expandable,
    );
  }

  static getHasDirectoryChildCallback() {
    return (_: number, node: FlatDirectoryTreeInterface) => node.expandable;
  }
}
