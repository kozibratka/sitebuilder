import {Component, OnInit} from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {ArrayHelper} from '../../../../../core/helpers/array-helper';

@Component({
  selector: 'app-menu-simple-plugin',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent extends AbstractPlugin<MenuConfigInterface> implements OnInit{
  itemsAsNestedArray = [];
  ngOnInit(): void {
    this.refreshView();
  }

  initEmptySettings(): MenuConfigInterface {
    return {
      identifier: PluginIdentifier.MENU_V1,
      logoImage: '',
      logoName: 'Logo',
      items: [
        {name: 'one', pageUrl: '', level: 0, page: null},
        {name: 'two', pageUrl: '', level: 1, page: null},
        {name: 'tree', pageUrl: '', level: 0, page: null},
      ]
    };
  }

  refreshView(): void {
    this.itemsAsNestedArray = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
