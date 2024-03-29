import {GridRowInterface} from "./grid-row-interface";

export interface PageBlockInterface {
  id?: number;
  rows: GridRowInterface[];
  uniqueId: string;
  category?: {id: number, name: string};
  webId?: number;
  imagePath?: string;
}
