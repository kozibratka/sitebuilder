import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {fromEvent} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {GridCellInterface} from "../../interfaces/grid-cell-interface";

@Component({
  selector: 'app-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.css'],
})
export class GridRowComponent implements OnInit, OnDestroy{
  @Input() row: GridRowInterface;
  @Input() isDeepChild = false;
  isResized = false;
  isMouseEnter = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isMouseEnter = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isMouseEnter = false;
  }

  onCellResized(event: MouseEvent, cellIndex: number) {
    this.isResized = true;
    let start = event.clientX;
    let cellWidth = this.elementRef.nativeElement.offsetWidth / 12;
    let leftCell = this.row.cells[cellIndex];
    let rightCell = this.row.cells[cellIndex + 1];
    let leftCellWidth = leftCell.width;
    let rightCellWidth = rightCell.width;
    this.document.body.style.cursor = 'col-resize';
    let subscriptionMouseMove = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousemove').subscribe(event2 => {
      let actualDiff = event2.clientX - start;
      let diffInCell = Math.round(actualDiff / cellWidth);
      let leftCellWidthTmp = leftCellWidth + diffInCell;
      let rightCellWidthTmp = rightCellWidth - diffInCell;
      if (leftCellWidthTmp && rightCellWidthTmp) {
        leftCell.width = leftCellWidthTmp;
        rightCell.width = rightCellWidthTmp;
      }
    });
    let subscriptionMouseUp = fromEvent(window, 'mouseup').subscribe(value => {
      subscriptionMouseUp.unsubscribe();
      subscriptionMouseMove.unsubscribe();
      this.document.body.style.cursor = '';
      this.isResized = false;
    });
  }

  decreaseCellWidthOnAddNewCell(startIndex: number, site : 'right' | 'left') {
    let sliced: GridCellInterface[] = [];
    if (site == 'right') {
      sliced.push(...this.row.cells.slice(startIndex));
      sliced.push(...this.row.cells.slice(0, startIndex).reverse());
    } else {
      sliced.push(...this.row.cells.slice(0, startIndex).reverse());
      sliced.push(...this.row.cells.slice(startIndex));
    }
    for(var val of sliced) {
      if (val.width > 1) {
        --val.width;
        return;
      }
    }
  }

  getWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }
}
