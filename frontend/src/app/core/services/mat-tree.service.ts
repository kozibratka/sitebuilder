import { Injectable } from '@angular/core';
import {MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

@Injectable({providedIn: 'root'})
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

  getParents(startPositionData: K, parents: K[] = []): K[] {
    let level = this.flatTreeControl.getLevel(startPositionData);
    let index = this.flatTreeControl.dataNodes.indexOf(startPositionData);
    for (; index >= 0; --index) {
      const data = this.flatTreeControl.dataNodes[index];
      if (this.flatTreeControl.getLevel(data) < level) {
        parents.push(data);
        --level;
      }
    }
    return parents;
  }

}
