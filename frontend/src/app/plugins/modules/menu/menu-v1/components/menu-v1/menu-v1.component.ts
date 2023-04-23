import { Component } from '@angular/core';
import {MenuV1ConfigInterface} from '../../interfaces/menu-v1-config-interface';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';

@Component({
  selector: 'app-menu-simple-plugin',
  templateUrl: './menu-v1.component.html',
  styleUrls: ['./menu-v1.component.css']
})
export class MenuV1Component extends AbstractPlugin<MenuV1ConfigInterface> {
  initEmptySettings(): MenuV1ConfigInterface {
    return {
      identifier: PluginIdentifier.MENU_V1,
      items: [
        {name: 'one', page: null, level: 0},
        {name: 'two', page: null, level: 1},
        {name: 'tree', page: null, level: 0},
      ]
    };
  }

  refreshView(): void {
  }
}
