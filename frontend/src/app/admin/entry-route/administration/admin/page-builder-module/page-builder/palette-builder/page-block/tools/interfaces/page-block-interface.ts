import {PaletteGridItemInterface} from '../../palette-item-component/tools/interfaces/palette-grid-item-interface';

export interface PageBlockInterface {
  id: number;
  paletteGridItems: PaletteGridItemInterface<any>[];
}
