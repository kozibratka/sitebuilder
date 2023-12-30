import {GridCellInterface} from "./grid-cell-interface";

export interface GridRowInterface {
  cells: GridCellInterface[];
  uniqueId?: string;
}
