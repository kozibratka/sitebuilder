import {ElementRef, Inject, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';

@Injectable()
export class PaletteBlockGridstackService {

  private gridStack: GridStack;
  private gridNodesRef: GridStackNode[] = [];
  private newGridNodes: ElementRef[] = [];

  constructor(private zone: NgZone) {

  }

  init(elementRef: ElementRef, gridStackNodes: GridStackNode[]): void {
    this.gridNodesRef = gridStackNodes;
    this.zone.runOutsideAngular(() => {
      this.gridStack = GridStack.init({acceptWidgets: true, column: 12, float: false}, elementRef.nativeElement);
      (this.gridStack as any).on('dropped', (event: Event, arg2: any, arg3: any) => {
        this.gridStack.removeWidget(arg3.el);
        this.gridNodesRef.push(arg3);
      });
    });
  }

  addWidget(elementRef: ElementRef): void {
    this.newGridNodes.push(elementRef);
  }

  reinit(): void {
    this.zone.runOutsideAngular(() => {
      this.newGridNodes.forEach(value => {
        this.gridStack.addWidget(value.nativeElement);
      });
      this.newGridNodes = [];
    });
  }
}
