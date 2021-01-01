import {ChangeDetectorRef, ElementRef, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {GridStackDragDrop} from '../3rd-party-modificators/grid-stack-drag-drop';
import {PaletteBlockService} from './palette-block.service';
import {PaletteItemComponent} from '../../palette-item-component/palette-item.component';
import {PaletteGridItemInterface} from '../../palette-item-component/tools/interfaces/palette-grid-item-interface';

@Injectable()
export class PaletteBlockGridstackService {

  private _gridStack: GridStack;
  private isInitied = false;
  private gridstackElement: ElementRef;
  private gridStackNodes: PaletteGridItemInterface[];
  private resizePaletteStartData = {mostBottomNumRows: 0, resizePaletteStartPosition: 0, cellHeight: 0, startNumRows: 0};
  private toResizeRows = 0;

  constructor(private zone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
              private paletteBlockService: PaletteBlockService
  ) {

  }

  init(elementRef: ElementRef, gridStackNodes: PaletteGridItemInterface[]): void {
    this.gridstackElement = elementRef;
    this.gridStackNodes = gridStackNodes;
    this.startGridstack();
  }

  startGridstack(): void {
      this._gridStack = GridStack.init({
        acceptWidgets: ".grid-stack-item-menu",
        column: 12,
        ddPlugin: GridStackDragDrop,
        float: true,
        row: 3,
        styleInHead: true,
        placeholderText: "Zde bude nový obsah :)",
      }, this.gridstackElement.nativeElement);
      this.isInitied = true;

      (this._gridStack as any).on('dropped', (event: Event, previousWidget: any, newWidget: GridStackNode) => {
        this._gridStack.removeWidget(newWidget.el);
        const newWidgetTmp = newWidget as PaletteGridItemInterface;
        newWidgetTmp.plugin = {identifier: 'none'};
        this.gridStackNodes.push(newWidgetTmp);
        this.zone.run(() => {
          this.changeDetectorRef.detectChanges();
        });
      });
  }

  addWidget(gridstackItemElementRef: ElementRef): void {
    if (this.isInitied) {
      this._gridStack.addWidget(gridstackItemElementRef.nativeElement);
    }
  }

  prepareResizeHorizontalPalette(paletteItemComponents: PaletteItemComponent[], mouseEvent: MouseEvent): void {
    this.resizePaletteStartData.resizePaletteStartPosition = mouseEvent.pageY;
    const paletteBlockGridstackItemDirectiveSorted =
      this.paletteBlockService.sortPaletteBlockGridstackItemDirective(paletteItemComponents);
    const lastBottomPaletteBlockGridstackItemDirective = paletteBlockGridstackItemDirectiveSorted[0] ?? null;
    this.resizePaletteStartData.mostBottomNumRows = lastBottomPaletteBlockGridstackItemDirective ?
      lastBottomPaletteBlockGridstackItemDirective.getRowsInGrid() : 0;
    this.resizePaletteStartData.cellHeight = this._gridStack.getCellHeight();
    this.resizePaletteStartData.startNumRows = this._gridStack.engine.maxRow;
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
    this._gridStack.opts.minRow = toMove;
    this._gridStack.engine.maxRow = toMove;
    (this._gridStack as any)._updateStyles();
    this.toResizeRows = toMove;
  }


  get gridStack(): GridStack {
    return this._gridStack;
  }

  set gridStack(value: GridStack) {
    this._gridStack = value;
  }
}
