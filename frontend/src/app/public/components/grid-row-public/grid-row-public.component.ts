import {Component, Input} from '@angular/core';
import {GridRowInterface} from "../../../page/interfaces/grid-row-interface";
import {GridCellPublicComponent} from "../grid-cell-public/grid-cell-public.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-grid-row-public',
  standalone: true,
  templateUrl: './grid-row-public.component.html',
  imports: [
    CommonModule,
    GridCellPublicComponent
  ],
  styleUrls: ['./grid-row-public.component.css']
})
export class GridRowPublicComponent {
  @Input() row: GridRowInterface;
  constructor(
  ) {
  }
}
