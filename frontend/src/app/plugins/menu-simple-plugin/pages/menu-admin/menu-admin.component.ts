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
        //ArrayHelper.recalculateNestedArrayObjectLevel(this.items);
        // this.items = ArrayHelper.objectWithLevelToNestedArray([
        //   {name: 'one', idPage: 4, level: 0},
        //   {name: 'two', idPage: 5, level: 1},
        //   {name: 'tree', idPage: 6, level: 0},
        // ] as any);
        console.log(this.items);
      },
      group: 'nested', animation: 150, swapThreshold: 0.65, fallbackOnBody: false,
    };
  }

  ngOnInit(): void {
    this.items = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
    console.log(this.items);
    // setTimeout(() => {
    //   this.items[0].children.pop();
    //   this.items.push({name: 'one', idPage: 7, level: 0, children: []});
    //   console.log(this.items);
    // }, 3000);
  }

  createAdminForm(settings: MenuSimpleConfigInterface): void {
  }
}
