import {Component, Input} from '@angular/core';
import {GridCellInterface} from "../../../page/interfaces/grid-cell-interface";

@Component({
  selector: 'app-grid-cell-public',
  templateUrl: './grid-cell-public.component.html',
  styleUrls: ['./grid-cell-public.component.css']
})
export class GridCellPublicComponent {
  @Input() cell: GridCellInterface;

}
