import { Component } from '@angular/core';
import {ConfigInterface} from '../../interfaces/config-interface';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';

@Component({
  selector: 'app-menu-simple-plugin',
  templateUrl: './menu-v1.component.html',
  styleUrls: ['./menu-v1.component.css']
})
export class MenuV1Component extends AbstractPlugin<ConfigInterface> {
  initEmptySettings(): ConfigInterface {
    return {
      identifier: PluginIdentifier.MENU_V1,
      items: [
        {name: 'one', page: 4, level: 0},
        {name: 'two', page: 5, level: 1},
        {name: 'tree', page: 6, level: 0},
      ]
    };
  }

  refreshView(): void {
  }
}