import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {GridCellInterface} from "../../interfaces/grid-cell-interface";
import {Subject} from "rxjs";
import {SortableEvent} from "sortablejs";
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {StringService} from "../../../core/services/string.service";
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit{
  @Input() cell: GridCellInterface;
  @Input() isLast = false;
  @Input() isFirst = false;
  @Input() isDeepChild = false;
  @Output() resized$ = new EventEmitter<MouseEvent>();
  @Input() isMouseEnterRow = false;
  @Output() addCell$ = new EventEmitter<'left' | 'right'>();
  @Output() removeCell$ = new EventEmitter<{site: 'left' | 'right', isRightPanel: boolean, isDeepChild: boolean}>();


  constructor(
    @Inject('SortableJsDragged') private sortableJsDragged$: Subject<boolean>,
  ) {
  }

  ngOnInit(): void {
  }

  onMouseDownResizeDelimiter(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.resized$.emit(event);
  }

  onDragStart = (event: any) => {
    this.sortableJsDragged$.next(true);
  }

  onDragEnd = (event: SortableEvent)=> {
    let index = event.newIndex;
    this.sortableJsDragged$.next(false);
  }

  onAdd = (event: SortableEvent) => {
    let newCellItem = this.cell.items[event.newIndex] as any;
    if (newCellItem.cells) {
      let newRow = this.cell.items[event.newIndex] as unknown as GridRowInterface;
      this.cell.items[event.newIndex] = {row: newRow, itemOrder: event.newIndex};
    }
    this.cell.items.forEach((value, index) => {
      value.itemOrder = index;
    });
  }

  trackByItem(index, item: GridCellItemInterface) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }

  deleteItem(index: number) {
    this.cell.items.splice(index, 1);
  }
}
