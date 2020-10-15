import { Injectable } from '@angular/core';
import {PaletteItemComponent} from '../../palette-item/palette-item.component';

@Injectable({
  providedIn: 'root'
})
export class PaletteBlockService {

  constructor() { }

  sortPaletteBlockGridstackItemDirective(paletteItemComponents: PaletteItemComponent[]):
    PaletteItemComponent[] {
    paletteItemComponents.sort((a, b) =>
      b.getRowsInGrid() - a.getRowsInGrid()
    );

    return paletteItemComponents;
  }
}
