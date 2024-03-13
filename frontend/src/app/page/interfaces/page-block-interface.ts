import {PaletteItemConfig} from './palette-item-config';
import {GridRowInterface} from "./grid-row-interface";

export interface PageBlockInterface {
  id?: number;
  rows: GridRowInterface[];
  uniqueId: string;
  category?: {id: number, name: string};
  web?: number;
  imagePath?: string;
}
