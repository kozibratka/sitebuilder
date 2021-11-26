import { Injectable } from '@angular/core';
import {MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Injectable()
export class MatTreeService<T extends {children: T[]}, K extends {level: number, expandable: boolean}> {

  constructor() {
  }

  treeFlattener: MatTreeFlattener<T, K>;
  flatTreeControl: FlatTreeControl<K>;

  getTreeFlattener(trrToFlatTransformer: (node: T, level: number) => any) {
    this.treeFlattener = new MatTreeFlattener<T, K>(
      trrToFlatTransformer,
      node => node.level,
      node => node.expandable,
      node => node.children,
    );
    return this.treeFlattener;
  }

  getDirectoryTreeControl() {
    if (!this.flatTreeControl) {
      this.flatTreeControl = new FlatTreeControl<K>(
        node => node.level,
        node => node.expandable,
      );
    }
    return this.flatTreeControl;
  }

  getHasDirectoryChildCallback() {
    return (_: number, node: K) => node.expandable;
  }

}
