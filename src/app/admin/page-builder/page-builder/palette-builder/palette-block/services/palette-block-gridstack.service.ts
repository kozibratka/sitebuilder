import {ChangeDetectorRef, ElementRef, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {GridStackDragDrop} from '../3rd-party-modificators/grid-stack-drag-drop';
import {PaletteBlockService} from './palette-block.service';
import {PaletteItemComponent} from '../palette-item/palette-item.component';

@Injectable()
export class PaletteBlockGridstackService {

  private gridStack: GridStack;
  private isInited = false;
  private gridstackElement: ElementRef;
  private gridStackNodes: GridStackNode[];
  private resizePaletteStartData = {mostBottomNumRows: 0, resizePaletteStartPosition: 0, cellHeight: 0, startNumRows: 0};
  private toResizeRows = 0;

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
      this.gridStack = GridStack.init({
        acceptWidgets: ".grid-stack-item-menu",
        column: 12,
        ddPlugin: GridStackDragDrop,
        float: true,
        row: 3,
        styleInHead: true,
        placeholderText: "Zde bude nový obsah :)",
      }, this.gridstackElement.nativeElement);
      this.isInited = true;

      (this.gridStack as any).on('dropped', (event: Event, previousWidget: any, newWidget: any) => {
        this.gridStack.removeWidget(newWidget.el);
        this.gridStackNodes.push(newWidget);
        this.zone.run(() => {
          this.changeDetectorRef.detectChanges();
        });

      });

  }

  addWidget(gridstackItemElementRef: ElementRef): void {
    if (this.isInited) {
      this.gridStack.addWidget(gridstackItemElementRef.nativeElement);
    }
  }

  prepareResizeHorizontalPalette(paletteItemComponents: PaletteItemComponent[], mouseEvent: MouseEvent): void {
    this.resizePaletteStartData.resizePaletteStartPosition = mouseEvent.pageY;
    const paletteBlockGridstackItemDirectiveSorted =
      this.paletteBlockService.sortPaletteBlockGridstackItemDirective(paletteItemComponents);
    const lastBottomPaletteBlockGridstackItemDirective = paletteBlockGridstackItemDirectiveSorted[0] ?? null;
    this.resizePaletteStartData.mostBottomNumRows = lastBottomPaletteBlockGridstackItemDirective ?
      lastBottomPaletteBlockGridstackItemDirective.getRowsInGrid() : 0;
    this.resizePaletteStartData.cellHeight = this.gridStack.getCellHeight();
    this.resizePaletteStartData.startNumRows = this.gridStack.engine.maxRow;
  }

  resizeHorizontalPalette(event: MouseEvent): void {
    const mousePalettePosition = event.pageY - this.resizePaletteStartData.resizePaletteStartPosition;
    let moveNumRows = Math.trunc(Math.abs(mousePalettePosition) / this.resizePaletteStartData.cellHeight);
    const modulo = Math.abs(mousePalettePosition) % this.resizePaletteStartData.cellHeight;
    if (modulo > (this.resizePaletteStartData.cellHeight / 2)) {
      ++moveNumRows;
    }
    let toMove = 0;
    if (mousePalettePosition < 0) {
      toMove = this.resizePaletteStartData.startNumRows - moveNumRows;
    } else {
      toMove = this.resizePaletteStartData.startNumRows + moveNumRows;
    }
    if (toMove < this.resizePaletteStartData.mostBottomNumRows) {
      return;
    }
    if (this.toResizeRows === toMove || toMove < 1) {
      return;
    }
    this.gridStack.opts.minRow = toMove;
    this.gridStack.engine.maxRow = toMove;
    (this.gridStack as any)._updateStyles();
    this.toResizeRows = toMove;
  }
}
