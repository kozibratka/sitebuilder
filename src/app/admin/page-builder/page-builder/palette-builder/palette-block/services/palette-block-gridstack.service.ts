import {ChangeDetectorRef, ElementRef, Host, Inject, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {GridStackDragDrop} from '../3rd-party-modificators/grid-stack-drag-drop';
import {PaletteBlockGridstackItemDirective} from '../directives/palette-block-gridstack-item.directive';
import {PaletteBlockService} from './palette-block.service';

@Injectable()
export class PaletteBlockGridstackService {

  private gridStack: GridStack;
  private isInited = false;
  private gridstackElement: ElementRef;
  private gridStackNodes: GridStackNode[];
  private mostBottomNumRows = 0;

  constructor(private zone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
              private paletteBlockService: PaletteBlockService
  ) {

  }

  init(elementRef: ElementRef, gridStackNodes: GridStackNode[]): void {
    this.gridstackElement = elementRef;
    this.gridStackNodes = gridStackNodes;
    this.startGridstack();
  }

  startGridstack(): void {
    this.zone.runOutsideAngular(() => {
      this.gridStack = GridStack.init({
        acceptWidgets: ".grid-stack-item-menu",
        column: 12,
        ddPlugin: GridStackDragDrop,
        float: true,
        styleInHead: true,
        placeholderText: "Zde bude nový obsah :)",
      }, this.gridstackElement.nativeElement);
      this.isInited = true;
      (this.gridStack as any).on('dropped', (event: Event, previousWidget: any, newWidget: any) => {
        // this.gridStack.opts.minRow = 4;
        // this.gridStack.engine.maxRow = 4;
        // this.gridStack.cellHeight(this.gridStack.getCellHeight());
        this.gridStack.removeWidget(newWidget.el);
        this.gridStackNodes.push(newWidget);
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  addWidget(gridstackItemElementRef: ElementRef): void {
    if (this.isInited) {
      this.gridStack.addWidget(gridstackItemElementRef.nativeElement);
    }
  }

  prepareResizeHorizontalPalette(paletteBlockGridstackItemDirectives: PaletteBlockGridstackItemDirective[]): void {
    const paletteBlockGridstackItemDirectiveSorted =
      this.paletteBlockService.sortPaletteBlockGridstackItemDirective(paletteBlockGridstackItemDirectives);
    const lastBottomPaletteBlockGridstackItemDirective = paletteBlockGridstackItemDirectiveSorted[0] ?? null;
    this.mostBottomNumRows = lastBottomPaletteBlockGridstackItemDirective ?
      lastBottomPaletteBlockGridstackItemDirective.getRowsInGrid() : 0;
  }

  resizeHorizontalPalette(event: any): void {
    console.log("egsg");
  }
}
