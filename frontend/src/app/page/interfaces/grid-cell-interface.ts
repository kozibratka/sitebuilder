import {GridCellItemInterface} from "./grid-cell-item-interface";

export interface GridCellInterface {
  items: GridCellItemInterface[];
  width: number;
  uniqueId?: string;
}
