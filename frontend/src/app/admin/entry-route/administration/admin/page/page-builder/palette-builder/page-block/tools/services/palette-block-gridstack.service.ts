import {ChangeDetectorRef, ElementRef, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {GridStackDragDrop} from '../3rd-party-modificators/grid-stack-drag-drop';
import {PaletteBlockService} from './palette-block.service';
import {PaletteItemComponent} from '../../palette-item-component/palette-item.component';
import {PaletteItemConfig} from '../../palette-item-component/tools/interfaces/palette-item-config';

@Injectable()
export class PaletteBlockGridstackService {

  private _gridStack: GridStack;
  private gridstackElement: ElementRef;
  private gridStackNodes: PaletteItemConfig[];
  private resizePaletteStartData = {mostBottomNumRows: 0, resizePaletteStartPosition: 0, cellHeight: 0, startNumRows: 0};
  private toResizeRows = 0;

  constructor(private zone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
              private paletteBlockService: PaletteBlockService
  ) {

  }

  init(elementRef: ElementRef, gridStackNodes: PaletteItemConfig[]): void {
    this.gridstackElement = elementRef;
    this.gridStackNodes = gridStackNodes;
    this.startGridstack();
  }

  startGridstack(): void {
      this._gridStack = GridStack.init({
        acceptWidgets: '.grid-stack-item-menu',
        column: 12,
        ddPlugin: GridStackDragDrop,
        float: true,
        row: 3,
        styleInHead: true,
        placeholderText: 'Zde bude nový obsah :)',
      }, this.gridstackElement.nativeElement);

      (this._gridStack as any).on('dropped', (event: Event, previousWidget: any, newWidget: GridStackNode) => {
        this._gridStack.removeWidget(newWidget.el);
        this.createGridItemOnDropNew(newWidget);
        this.zone.run(() => {
          this.changeDetectorRef.detectChanges();
        });
      });
      (this._gridStack as any).on('change', (event: Event, items: GridStackNode[]) => {
        const paleteItem = this.gridStackNodes.find(value => value.gridstackNode === items[0]);
        if (paleteItem) {
          this.updatePaletteItemGridProperty(items[0], paleteItem);
        }
      });
  }

  addWidget(paletteItemComponent: PaletteItemComponent) {
    this._gridStack.addWidget(paletteItemComponent.elementRef.nativeElement, paletteItemComponent.paletteItemConfig);
    paletteItemComponent.paletteItemConfig.gridstackNode = paletteItemComponent.elementRef.nativeElement.gridstackNode;

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

  createGridItemOnDropNew(newWidget: GridStackNode): void {
    const newWidgetTmp: PaletteItemConfig = {plugin: {identifier: 'none'}};
    this.updatePaletteItemGridProperty(newWidget, newWidgetTmp);
    this.gridStackNodes.push(newWidgetTmp);
  }

  updatePaletteItemGridProperty(gridNode: GridStackNode, paletteItem: PaletteItemConfig) {
    paletteItem.x = gridNode.x;
    paletteItem.y = gridNode.y;
    paletteItem.width = gridNode.width;
    paletteItem.height = gridNode.height;
  }

  get gridStack(): GridStack {
    return this._gridStack;
  }

  set gridStack(value: GridStack) {
    this._gridStack = value;
  }
}