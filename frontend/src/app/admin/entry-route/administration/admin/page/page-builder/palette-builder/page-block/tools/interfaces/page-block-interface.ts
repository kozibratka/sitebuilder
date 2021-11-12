import {PaletteItemConfig} from '../../palette-item-component/tools/interfaces/palette-item-config';

export interface PageBlockInterface {
  id?: number;
  height: number;
  paletteGridItems: PaletteItemConfig[];
}
