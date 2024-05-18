import { Injectable } from '@angular/core';
import {BasePlugConfigInterface} from "../../plugins/interfaces/base-plug-config-interface";

@Injectable({
  providedIn: 'root'
})
export class GridCellService {

  constructor() { }

  getHorizontalMargin(plugin: BasePlugConfigInterface) {
    if (!plugin || typeof(plugin.horizontalMargin) === 'undefined' || plugin.horizontalMargin === null) {
      return {
        "marginLeft": '15px',
        "marginRight": '15px',
      }
    } else {
      return {
        "marginLeft": plugin.horizontalMargin+'px',
        "marginRight": plugin.horizontalMargin+'px',
      }
    }
  }
}
