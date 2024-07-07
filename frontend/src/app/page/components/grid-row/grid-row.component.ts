import {
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {fromEvent, Subject} from "rxjs";
import {CommonModule, DOCUMENT} from "@angular/common";
import {GridCellInterface} from "../../interfaces/grid-cell-interface";
import {StringService} from "../../../core/services/string.service";
import {DragStatusService} from "../../services/drag-status.service";
import {GridCellComponent} from "../grid-cell/grid-cell.component";
import {
  AnimationHiderComponent
} from "../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";

@Component({
  selector: 'app-grid-row',
  standalone: true,
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.css'],
  imports: [
    CommonModule,
    GridCellComponent,
    AnimationHiderComponent
  ]
})
export class GridRowComponent implements OnInit, OnDestroy{
  @Input() row: GridRowInterface;
  @Input() isDeepChild = false;
  @Output() removeRow$ = new EventEmitter<boolean>();
  isResized = false;
  @HostBinding('class.is-mouse-enter') isMouseEnter = false;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private dragStatusService: DragStatusService,
  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  @HostListener('mouseenter', ["$event"])
  onMouseEnter(event) {
    this.isMouseEnter = true;
    if (this.isDeepChild) {
      event.stopPropagation();
    }
  }

  @HostListener('mouseleave', ["$event"])
  onMouseLeave(event) {
    this.isMouseEnter = false;
    if (this.isDeepChild) {
      event.stopPropagation();
    }  }

  @HostListener('dragover', ["$event"])
  onDragOver(event) {
    if (this.isDeepChild) {
      event.stopPropagation();
    }  }

  @HostListener('dragstart', ["$event"])
  onDragStart(event) {
    if (this.isDeepChild) {
      event.stopPropagation();
    }  }
  @HostListener('dragenter', ["$event"])
  onDragEnter(event) {
    if (this.isDeepChild) {
      event.stopPropagation();
    }  }

  onCellResized(event: MouseEvent, cellIndex: number) {
    this.isResized = true;
    this.dragStatusService.isCellResized = true;
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
      if (leftCellWidthTmp > 0 && rightCellWidthTmp > 0) {
        leftCell.width = leftCellWidthTmp;
        rightCell.width = rightCellWidthTmp;
      }
    });
    let subscriptionMouseUp = fromEvent(window, 'mouseup').subscribe(value => {
      subscriptionMouseUp.unsubscribe();
      subscriptionMouseMove.unsubscribe();
      this.document.body.style.cursor = '';
      this.isResized = false;
      this.dragStatusService.isCellResized = false;
    });
  }

  addNewCell(startIndex: number, site : 'right' | 'left') {
    if (this.row.cells.length == 12) {
      return;
    }
    let sliced: GridCellInterface[] = [];
    if (site == 'left') {
      sliced.push(...this.row.cells.slice(startIndex));
      sliced.push(...this.row.cells.slice(0, startIndex).reverse());
    } else {
      sliced.push(...this.row.cells.slice(0, startIndex).reverse());
      sliced.push(...this.row.cells.slice(startIndex));
    }
    for(var val of sliced) {
      if (val.width > 1) {
        --val.width;
        break;
      }
    }
    if(site == 'left') {
      this.row.cells.splice(startIndex, 0, {width: 1, items: []})
    } else {
      this.row.cells.splice(startIndex+1, 0, {width: 1, items: []})
    }
  }

  removeCell(startIndex: number, cellInfo: {site: string, isRightPanel: boolean, isDeepChild: boolean}) {
    if (this.row.cells.length < 2 || (cellInfo.isDeepChild && this.row.cells.length == 2)) {
      return;
    }
    let startCell = this.row.cells[startIndex];
    if (cellInfo.isRightPanel) {
      if (cellInfo.site === 'left') {
        let toRemoveCell = this.row.cells[startIndex];
        this.row.cells.splice(startIndex, 1);
        if (this.row.cells[startIndex-1]) {
          this.row.cells[startIndex-1].width += toRemoveCell.width;
        }
      }
    }
    else if(cellInfo.site == 'left') {
      if (startIndex) {
        let toRemoveCell = this.row.cells[startIndex-1];
        this.row.cells.splice(startIndex-1, 1);
        startCell.width += toRemoveCell.width;
      }
    } else {
        let toRemoveCell = this.row.cells[startIndex];
        this.row.cells.splice(startIndex, 1);
        let toResizeIndex = startIndex-1;
        if (toResizeIndex < 0) {
          toResizeIndex = 0;
        }
        if (this.row.cells[toResizeIndex]) {
          this.row.cells[toResizeIndex].width += toRemoveCell.width;
        }
    }
  }

  getWidth() {
    return this.elementRef.nativeElement.offsetWidth;
  }

  trackByCell(index, item: GridCellInterface) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }
}
