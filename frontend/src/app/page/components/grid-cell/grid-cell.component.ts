import {Component, EventEmitter, Host, HostBinding, HostListener, Inject, Input, OnInit, Output} from '@angular/core';
import {GridCellInterface} from "../../interfaces/grid-cell-interface";
import {GridRowComponent} from "../grid-row/grid-row.component";
import {fromEvent} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent {
  @Input() cell: GridCellInterface;
  @Input() isLast = false;
  @Output() resized$ = new EventEmitter<MouseEvent>();


  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  onMouseDownResizeDelimiter(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.resized$.emit(event);
  }
}
