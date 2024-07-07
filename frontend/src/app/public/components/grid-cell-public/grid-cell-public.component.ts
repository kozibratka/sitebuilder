import {Component, Input} from '@angular/core';
import {GridCellInterface} from "../../../page/interfaces/grid-cell-interface";
import {GridCellService} from "../../../page/services/grid-cell.service";
import {GridCellItemPublicComponent} from "../grid-cell-item-public/grid-cell-item-public.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-grid-cell-public',
  standalone: true,
  templateUrl: './grid-cell-public.component.html',
  imports: [
    CommonModule,
    GridCellItemPublicComponent
  ],
  styleUrls: ['./grid-cell-public.component.css']
})
export class GridCellPublicComponent {
  @Input() cell: GridCellInterface;


  constructor(
    public gridCellService: GridCellService
  ) {
  }
}
