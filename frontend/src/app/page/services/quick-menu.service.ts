import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {GridCellItemComponent} from "../components/grid-cell-item/grid-cell-item.component";

@Injectable({
  providedIn: 'root'
})
export class QuickMenuService {

  moveMenu = new Subject<GridCellItemComponent | boolean>();
  constructor() { }
}
