import { Injectable } from '@angular/core';
import {PaletteBlockGridstackItemDirective} from '../directives/palette-block-gridstack-item.directive';

@Injectable({
  providedIn: 'root'
})
export class PaletteBlockService {

  constructor() { }

  sortPaletteBlockGridstackItemDirective(paletteBlockGridstackItemDirectives: PaletteBlockGridstackItemDirective[]):
    PaletteBlockGridstackItemDirective[] {
    paletteBlockGridstackItemDirectives.sort((a, b) =>
      b.getRowsInGrid() - a.getRowsInGrid()
    );

    return paletteBlockGridstackItemDirectives;
  }
}
