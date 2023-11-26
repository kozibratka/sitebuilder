import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {GridCellInterface} from "../../interfaces/grid-cell-interface";

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.css']
})
export class GridCellComponent implements OnInit{
  @Input() cell: GridCellInterface;
  @HostBinding('class') widthClass;

  ngOnInit(): void {
    this.widthClass = `col-md-${this.cell.width}`;
  }
}
