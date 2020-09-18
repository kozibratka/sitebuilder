import {ChangeDetectorRef, ElementRef, Host, Inject, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {GridStackDragDrop} from '../3rd-party-modificators/grid-stack-drag-drop';

@Injectable()
export class PaletteBlockGridstackService {

  private gridStack: GridStack;
  private isInited = false;
  private gridstackElement: ElementRef;
  private gridStackNodes: GridStackNode[];

  constructor(private zone: NgZone, private changeDetectorRef: ChangeDetectorRef) {

  }

  init(elementRef: ElementRef, gridStackNodes: GridStackNode[]): void {
    this.gridstackElement = elementRef;
    this.gridStackNodes = gridStackNodes;
    this.startGridstack();
  }

  startGridstack(): void {
    this.zone.runOutsideAngular(() => {
      this.gridStack = GridStack.init({
        acceptWidgets: true,
        column: 12,
        ddPlugin: GridStackDragDrop,
        float: true,
        styleInHead: true,
        placeholderText: "Zde bude nový obsah :)",
      }, this.gridstackElement.nativeElement);
      this.isInited = true;
      (this.gridStack as any).on('dropped', (event: Event, arg2: any, arg3: any) => {
        this.gridStack.removeWidget(arg3.el);
        this.gridStackNodes.push(arg3);
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  addWidget(elementRef: ElementRef): void {
    if (this.isInited) {
      this.gridStack.addWidget(elementRef.nativeElement);
    }
  }
}
