import {GridRowInterface} from "./grid-row-interface";

export interface PageBlockInterface {
  id?: number;
  rows: GridRowInterface[];
  uniqueId: string;
  category?: {id: number, name: string};
  webId?: number;
  imagePath?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundVideo?: string;
  height?: number;
  grayScale?: number;
  opacity?: number;
  paddingTop?: number;
  paddingBottom?: number;
}
