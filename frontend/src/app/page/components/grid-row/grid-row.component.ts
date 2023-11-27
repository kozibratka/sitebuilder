import {Component, Input} from '@angular/core';
import {GridRowInterface} from "../../interfaces/grid-row-interface";

@Component({
  selector: 'app-grid-row',
  templateUrl: './grid-row.component.html',
  styleUrls: ['./grid-row.component.css']
})
export class GridRowComponent {
  @Input() row: GridRowInterface;
  @Input() isDeepChild = false;
}
