import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {MenuSimpleConfigInterface} from '../../interfaces/menu-simple-config-interface';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent extends AbstractAdminSetting<MenuSimpleConfigInterface> implements OnInit, OnDestroy{

  items = [];
  options;

  constructor() {
    super();
    this.options = {
      onEnd: (event: any) => {
        ArrayHelper.recalculateNestedArrayObjectLevel(this.items);
        this.refreshSettings();
      },
      group: 'nested', animation: 150, swapThreshold: 0.65, fallbackOnBody: false,
    };
  }

  ngOnInit(): void {
    this.items = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
  }

  ngOnDestroy(): void {
    ArrayHelper.recalculateNestedArrayObjectLevel(this.items, true);
  }

  removeItem(sourceArray: [], index: number) {
    sourceArray.splice(index, 1);
    this.refreshSettings();
  }

  refreshSettings() {
    this.settings.items = ArrayHelper.flatNestedArrayObject(this.items);
  }

  createAdminForm(settings: MenuSimpleConfigInterface): void {
  }
}
