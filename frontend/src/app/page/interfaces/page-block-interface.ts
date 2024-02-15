import {PaletteItemConfig} from './palette-item-config';
import {GridRowInterface} from "./grid-row-interface";

export interface PageBlockInterface {
  id?: number;
  height: number;
  paletteGridItems: PaletteItemConfig[];
  rows: GridRowInterface[];
  uniqueId: string;
  category?: number;
  web?: number;
}
