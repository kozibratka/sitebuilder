import { Component } from '@angular/core';
import {AbstractPlugin} from '../tools/abstract-class/abstract-plugin';
import {MenuSimpleConfigInterface} from './interfaces/menu-simple-config-interface';
import {PluginIdentifier} from '../tools/constants/plugin-identifier';

@Component({
  selector: 'app-menu-simple-plugin',
  templateUrl: './menu-simple-plugin.component.html',
  styleUrls: ['./menu-simple-plugin.component.css']
})
export class MenuSimplePluginComponent extends AbstractPlugin<MenuSimpleConfigInterface> {
  initEmptySettings(): MenuSimpleConfigInterface {
    return {
      identifier: PluginIdentifier.SIMPLE_MENU,
      menuSimpleItems: [
        {name: 'one', page: 4, level: 0},
        {name: 'two', page: 5, level: 1},
        {name: 'tree', page: 6, level: 0},
      ]
    };
  }

  refreshView(): void {
  }
}
