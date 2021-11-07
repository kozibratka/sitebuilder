import {PaletteGridItemInterface} from '../../palette-item-component/tools/interfaces/palette-grid-item-interface';

export interface PageBlockInterface {
  id?: number;
  height: number;
  paletteGridItems: PaletteGridItemInterface[];
}
