import {PaletteItemConfig} from './palette-item-config';

export interface PageBlockInterface {
  id?: number;
  height: number;
  paletteGridItems: PaletteItemConfig[];
}
