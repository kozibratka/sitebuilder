import {BasePlugConfigInterface} from "../../plugins/shared/interfaces/base-plug-config-interface";
import {GridRowInterface} from "./grid-row-interface";

export interface GridCellItemInterface {
  plugin?: BasePlugConfigInterface;
  row?: GridRowInterface;
  id?: number;
  itemOrder: number;
  uniqueId?: string;
}
