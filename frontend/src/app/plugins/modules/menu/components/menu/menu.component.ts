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

  refreshView(): void {
    this.itemsAsNestedArray = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
