import {ChangeDetectorRef, ElementRef, Host, Inject, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';

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
      if (this.gridStack) {
        this.gridStack.destroy(false);
      }
      this.gridStack = GridStack.init({
        acceptWidgets: true,
        column: 12,
        float: true,
        styleInHead: true,
        placeholderText: "Zde bude nový obsah :)",
        staticGrid: true
      }, this.gridstackElement.nativeElement);
      this.isInited = true;
      this.gridStack.setStatic(false);
      (this.gridStack as any).on('dropped', (event: Event, arg2: any, arg3: any) => {
        this.gridStack.removeWidget(arg3.el);
        this.gridStackNodes.push(arg3);
        this.changeDetectorRef.detectChanges();
      });
      (this.gridStack as any).off('dropped');
    });
  }

  terminate(): void{
    // this.gridStack.destroy(false);
    // setTimeout(() => this.startGridstack(), 0);

  }

  addWidget(elementRef: ElementRef): void {
    if (this.isInited) {
      console.log("add");
      this.gridStack.addWidget(elementRef.nativeElement);
    }
  }
}
