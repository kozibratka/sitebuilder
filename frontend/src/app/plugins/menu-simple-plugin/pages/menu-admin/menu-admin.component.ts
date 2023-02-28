import {Component, OnInit} from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {MenuSimpleConfigInterface} from '../../interfaces/menu-simple-config-interface';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent extends AbstractAdminSetting<MenuSimpleConfigInterface> implements OnInit{

  items = [];
  options;

  constructor() {
    super();
    this.options = {
      onEnd: (event: any) => {
        console.log('gesgese');
        ArrayHelper.recalculateNestedArrayObjectLevel(this.items);
        console.log(this.items);
      },
      group: 'nested', animation: 150, swapThreshold: 0.65, handle: '.handle'
    };
  }

  ngOnInit(): void {
    this.items = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
  }

  createAdminForm(settings: MenuSimpleConfigInterface): void {
  }
}
