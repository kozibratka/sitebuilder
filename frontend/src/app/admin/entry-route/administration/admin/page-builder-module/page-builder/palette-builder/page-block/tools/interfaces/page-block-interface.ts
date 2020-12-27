import {PaletteItemInterface} from '../../palette-item-component/tools/interfaces/palette-item-interface';

export interface PageBlockInterface {
  id: number;
  paletteItems: PaletteItemInterface<any>[];
}
