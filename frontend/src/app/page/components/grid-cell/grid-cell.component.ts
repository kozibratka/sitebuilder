import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridCellInterface} from "../../interfaces/grid-cell-interface";
import {MoveEvent, SortableEvent} from "sortablejs";
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {StringService} from "../../../core/services/string.service";
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {GridCellService} from "../../services/grid-cell.service";
import {DragStatusService} from "../../services/drag-status.service";
import {SortablejsModule} from "nxt-sortablejs";
import {GridCellItemComponent} from "../grid-cell-item/grid-cell-item.component";
import {
  AnimationHiderComponent
} from "../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuContent, MatMenuTrigger} from "@angular/material/menu";
import {CommonModule} from "@angular/common";
import {GridRowComponent} from "../grid-row/grid-row.component";

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  templateUrl: './grid-cell.component.html',
  imports: [
    CommonModule,
    SortablejsModule,
    GridCellItemComponent,
    AnimationHiderComponent,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuContent
  ],
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit{
  arrayB = ['B'];
  @Input() cell: GridCellInterface;
  @Input() isLast = false;
  @Input() isFirst = false;
  @Input() isDeepChild = false;
  @Output() resized$ = new EventEmitter<MouseEvent>();
  @Input() isMouseEnterRow = false;
  @Output() addCell$ = new EventEmitter<'left' | 'right'>();
  @Output() removeCell$ = new EventEmitter<{site: 'left' | 'right', isRightPanel: boolean, isDeepChild: boolean}>();


  constructor(
    public gridCellService: GridCellService,
    private dragStatusService: DragStatusService,
    public gridRowComponent:GridRowComponent,
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
    this.dragStatusService.isDragPlugin = true;
  }

  onDragEnd = (event: SortableEvent)=> {
    let index = event.newIndex;
    this.dragStatusService.isDragPlugin = false;
  }

  onAdd = (event: SortableEvent) => {
    let newCellItem = this.cell.items[event.newIndex] as any;
    if (newCellItem.cells) {
      let newRow = this.cell.items[event.newIndex] as unknown as GridRowInterface;
      newRow.uniqueId = StringService.randomString();
      this.cell.items[event.newIndex] = {row: newRow, itemOrder: event.newIndex};
    }
    this.cell.items.forEach((value, index) => {
      value.itemOrder = index;
    });
  }

  onMove = (event: MoveEvent) => {
    if (
      event.dragged.querySelector('.is-row') &&
      (event.related.tagName !== 'APP-GRID-CELL-ITEM' || event.related.classList.contains('is-deep-child'))
    ) {
      return false;
    }

    return true;
  }

  trackByItem(index, item: GridCellItemInterface) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    if (item.row && !item.row.uniqueId) {
      item.row.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }

  deleteItem(index: number) {
    this.cell.items.splice(index, 1);
  }
}
