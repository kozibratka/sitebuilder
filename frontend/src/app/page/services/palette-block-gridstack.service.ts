import {ChangeDetectorRef, ElementRef, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockService} from './palette-block.service';
import {PaletteItemConfig} from '../interfaces/palette-item-config';
import {GridStackDragDrop} from './grid-stack-drag-drop';
import {PaletteItemComponent} from '../components/palette-builder/page-block/palette-item-component/palette-item.component';

@Injectable()
export class PaletteBlockGridstackService {

  private _gridStack: GridStack;
  private gridstackElement: ElementRef;
  private paletteItemConfigs: PaletteItemConfig[];
  private resizePaletteStartData = {mostBottomNumRows: 0, resizePaletteStartPosition: 0, cellHeight: 0, startNumRows: 0};
  private toResizeRows = 0;
  private paletteItemComponents: PaletteItemComponent[] = [];

  constructor(private zone: NgZone,
              private changeDetectorRef: ChangeDetectorRef,
              private paletteBlockService: PaletteBlockService
  ) {

  }

  init(elementRef: ElementRef, gridStackNodes: PaletteItemConfig[]): void {
    this.gridstackElement = elementRef;
    this.paletteItemConfigs = gridStackNodes;
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
        const paleteItem = this.paletteItemComponents.find(value => value.elementRef.nativeElement.gridstackNode === items[0]);
        if (paleteItem) {
          this.updatePaletteItemGridProperty(items[0], paleteItem.gridItemConfig);
        }
      });
  }

  addWidget(paletteItemComponent: PaletteItemComponent) {
    this._gridStack.addWidget(paletteItemComponent.elementRef.nativeElement, {...paletteItemComponent.gridItemConfig});
    this.paletteItemComponents.push(paletteItemComponent);
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
    const newWidgetTmp: PaletteItemConfig = {plugin: {identifier: 'none', id: null, name: ''}};
    this.updatePaletteItemGridProperty(newWidget, newWidgetTmp);
    this.paletteItemConfigs.push(newWidgetTmp);
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
