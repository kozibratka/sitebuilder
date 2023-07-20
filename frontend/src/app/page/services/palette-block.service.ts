import {Injectable} from '@angular/core';
import {PaletteItemComponent} from '../components/palette-builder/page-block/palette-item-component/palette-item.component';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaletteBlockService {
  public isResized$ = new Subject<boolean>();

  constructor() { }

  sortPaletteBlockGridstackItemDirective(paletteItemComponents: PaletteItemComponent[]):
    PaletteItemComponent[] {
    paletteItemComponents.sort((a, b) =>
      b.getRowsInGrid() - a.getRowsInGrid()
    );

    return paletteItemComponents;
  }
}
