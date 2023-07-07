import {ChangeDetectorRef, ElementRef, Injectable, NgZone} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockService} from './palette-block.service';
import {PaletteItemConfig} from '../interfaces/palette-item-config';
// import {GridStackDragDrop} from './grid-stack-drag-drop';
import {PaletteItemComponent} from '../components/palette-builder/page-block/palette-item-component/palette-item.component';
import {PageBlockInterface} from '../interfaces/page-block-interface';
import {PublicGridItemComponent} from '../../public/components/public-grid-item/public-grid-item.component';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PaletteBlockGridstackService {
  gridstackBlocks = new Map<HTMLElement, GridStack>();
  private resizePaletteStartData = {mostBottomNumRows: 0, resizePaletteStartPosition: 0, cellHeight: 0, startNumRows: 0};
  private toResizeRows = 0;
  private paletteItemComponents: PaletteItemComponent[] = [];
  public gridstackBlock = null;

  constructor(private zone: NgZone,
              private paletteBlockService: PaletteBlockService,
  ) {
  }

  init(block: ElementRef, gridStackNodes: PaletteItemConfig[], pageBlock: PageBlockInterface, changeDetectorRef: ChangeDetectorRef): void {
    this.zone.runOutsideAngular(() => {
      this.gridstackBlock = GridStack.init({
        acceptWidgets: '.grid-stack-item-menu',
        column: 12,
        // ddPlugin: GridStackDragDrop,
        float: true,
        margin: 0,
        cellHeight: '20px',
        animate: true,
        handleClass: 'icon-move',
        // minRow: pageBlock.height,
        styleInHead: true,
      }, block.nativeElement);

    });

    this.gridstackBlocks.set(block.nativeElement, this.gridstackBlock);
    (this.gridstackBlock as any).on('dropped', (event: Event, previousWidget: any, newWidget: GridStackNode) => {
      this.gridstackBlock.removeWidget(newWidget.el);
      this.createGridItemOnDropNew(newWidget, gridStackNodes);
      this.zone.run(() => {
        changeDetectorRef.detectChanges();
      });
    });
    // (gridstackBlock as any).on('change', (event: Event, items: GridStackNode[]) => {
    //   const paleteItem = this.paletteItemComponents.find(value => value.elementRef.nativeElement.gridstackNode === items[0]);
    //   if (paleteItem) {
    //     this.updatePaletteItemGridProperty(items[0], paleteItem.gridItemConfig);
    //   }
    // });
  }

  startGridStackPalettePublic(pageBlock: PageBlockInterface, paletteElement: ElementRef) {
    const gridstackBlock = GridStack.init({
      column: 12,
      staticGrid: true,
      margin: 0,
      // cellHeight: '10px',
      // float: true,
      minRow: pageBlock.height,
      styleInHead: true,
    }, paletteElement.nativeElement);
    this.gridstackBlocks.set(paletteElement.nativeElement, gridstackBlock);
  }

  addWidget(paletteItemComponent: PaletteItemComponent, block: HTMLElement) {
    this.zone.runOutsideAngular(() => {
      this.gridstackBlocks.get(block).addWidget(paletteItemComponent.elementRef.nativeElement, {...paletteItemComponent.gridItemConfig});
      this.paletteItemComponents.push(paletteItemComponent);
    });
  }

  addWidgetPublic(paletteItemComponent: PublicGridItemComponent, block: HTMLElement) {
    this.gridstackBlocks.get(block).addWidget(paletteItemComponent.elementRef.nativeElement, {...paletteItemComponent.gridItemConfig});
  }

  prepareResizeHorizontalPalette(paletteItemComponents: PaletteItemComponent[], mouseEvent: MouseEvent, block: HTMLElement): void {
    this.resizePaletteStartData.resizePaletteStartPosition = mouseEvent.pageY;
    const paletteBlockGridstackItemDirectiveSorted =
      this.paletteBlockService.sortPaletteBlockGridstackItemDirective(paletteItemComponents);
    const lastBottomPaletteBlockGridstackItemDirective = paletteBlockGridstackItemDirectiveSorted[0] ?? null;
    this.resizePaletteStartData.mostBottomNumRows = lastBottomPaletteBlockGridstackItemDirective ?
      lastBottomPaletteBlockGridstackItemDirective.getRowsInGrid() : 0;
    this.resizePaletteStartData.cellHeight = this.gridstackBlocks.get(block).getCellHeight();
    this.resizePaletteStartData.startNumRows = this.gridstackBlocks.get(block).engine.maxRow;
  }

  resizeHorizontalPalette(event: MouseEvent, block: HTMLElement, pageBlock: PageBlockInterface): void {
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
    if (toMove < 1 && toMove < this.resizePaletteStartData.mostBottomNumRows) {
      return;
    }
    if (this.toResizeRows === toMove || toMove < 1) {
      return;
    }
    // this.gridstackBlocks.get(block).opts.minRow = toMove;
    // this.gridstackBlocks.get(block).engine.maxRow = toMove;
    pageBlock.height = toMove;
    (this.gridstackBlocks.get(block) as any)._updateStyles();
    this.toResizeRows = toMove;
  }

  createGridItemOnDropNew(newWidget: GridStackNode, gridStackNodes: PaletteItemConfig[]): void {
    const newWidgetTmp: PaletteItemConfig = {plugin: {identifier: 'none', id: null, name: null}};
    this.updatePaletteItemGridProperty(newWidget, newWidgetTmp);
    gridStackNodes.push(newWidgetTmp);
  }

  updatePaletteItemGridProperty(gridNode: GridStackNode, paletteItem: PaletteItemConfig) {
    paletteItem.x = gridNode.x;
    paletteItem.y = gridNode.y;
    paletteItem.w = gridNode.w;
    paletteItem.h = gridNode.h;
  }

  recalculateGridHeightByContent(gridItem: PublicGridItemComponent) {
    const mustBeDiff = gridItem.gridItemConfig.diffGridAndContentBottomHeightPx;
    if (mustBeDiff === null || window.innerWidth < 769) {
      return;
    }
    const gridBlockInstance = this.gridstackBlocks.get(gridItem.pageBlockComponent.paletteContent.nativeElement);
    const cellHeight =  gridBlockInstance.getCellHeight();
    const actualGridContentDiffPx = this.getBottomDiffPx(gridItem.elementRef.nativeElement, gridItem.gridContent.nativeElement);
    const diff = Math.abs(mustBeDiff - actualGridContentDiffPx);
    const diffInCell = Math.round(diff / cellHeight);
    const newCellsToAdd = (actualGridContentDiffPx > mustBeDiff) ? -diffInCell : diffInCell;
    const newCells = gridItem.elementRef.nativeElement.gridstackNode.h + newCellsToAdd;
    gridBlockInstance.update(gridItem.elementRef.nativeElement, {h: newCells});
  }

  getBottomDiffPx(element1: HTMLElement, element2: HTMLElement) {
    const gridRect = element1.getBoundingClientRect();
    const contentRect = element2.getBoundingClientRect();
    return Math.abs(gridRect.bottom - contentRect.bottom);
  }
}
