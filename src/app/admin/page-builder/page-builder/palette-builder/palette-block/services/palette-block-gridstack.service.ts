import {ChangeDetectorRef, ElementRef, Inject, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';

@Injectable()
export class PaletteBlockGridstackService {

  private gridStack: GridStack;
  private isInited = false;

  constructor(private zone: NgZone, private a: ChangeDetectorRef) {

  }

  init(elementRef: ElementRef, gridStackNodes: GridStackNode[]): void {
    this.zone.runOutsideAngular(() => {
      this.gridStack = GridStack.init({acceptWidgets: true, column: 12, float: true}, elementRef.nativeElement);
      this.isInited = true;
      (this.gridStack as any).on('dropped', (event: Event, arg2: any, arg3: any) => {
        this.gridStack.removeWidget(arg3.el);
        gridStackNodes.push(arg3);
        this.a.detectChanges();
      });
    });
  }

  addWidget(elementRef: ElementRef): void {
    if(this.isInited){
      this.gridStack.addWidget(elementRef.nativeElement);
    }
  }
}
