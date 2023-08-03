import {Component, OnInit} from '@angular/core';
import {MenuV1ConfigInterface} from '../../interfaces/menu-v1-config-interface';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';
import {ArrayHelper} from '../../../../../../core/helpers/array-helper';

@Component({
  selector: 'app-menu-simple-plugin',
  templateUrl: './menu-v1.component.html',
  styleUrls: ['./menu-v1.component.css']
})
export class MenuV1Component extends AbstractPlugin<MenuV1ConfigInterface> implements OnInit{
  itemsAsNestedArray = [];
  ngOnInit(): void {
    this.refreshView();
  }

  initEmptySettings(): MenuV1ConfigInterface {
    return {
      identifier: PluginIdentifier.MENU_V1,
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
