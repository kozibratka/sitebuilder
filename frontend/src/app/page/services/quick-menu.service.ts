import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteItemComponent} from '../components/palette-builder/page-block/palette-item-component/palette-item.component';

@Injectable({
  providedIn: 'root'
})
export class QuickMenuService {

  moveMenu = new Subject<PaletteItemComponent | boolean>();
  constructor() { }
}
