import {Component, Input} from '@angular/core';
import {GridRowInterface} from "../../../page/interfaces/grid-row-interface";

@Component({
  selector: 'app-grid-row-public',
  templateUrl: './grid-row-public.component.html',
  styleUrls: ['./grid-row-public.component.css']
})
export class GridRowPublicComponent {
  @Input() row: GridRowInterface;
  constructor(
  ) {
  }
}
