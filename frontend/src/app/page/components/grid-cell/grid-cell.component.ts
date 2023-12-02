import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {GridCellInterface} from "../../interfaces/grid-cell-interface";
import {Subject} from "rxjs";

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit{
  @Input() cell: GridCellInterface;
  @Input() isLast = false;
  @Output() resized$ = new EventEmitter<MouseEvent>();


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

  onDragEnd = (event: any)=> {
    this.sortableJsDragged$.next(false);
  }
}
