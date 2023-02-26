import {Component, OnInit} from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {MenuSimpleConfigInterface} from '../../interfaces/menu-simple-config-interface';
import {ArrayHelper} from '../../../../core/helpers/array-helper';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent extends AbstractAdminSetting<MenuSimpleConfigInterface> implements OnInit{

  items = [1, 2, 3, 4, [5, 6]];
  options: { onUpdate: (event: any) => void };

  constructor() {
    super();
    this.options = {
      onUpdate: (event: any) => {
        console.log(this.items);
      }
    };
  }

  ngOnInit(): void {
    this.items = ArrayHelper.objectWithLevelToArray(this.settings.items);
  }

  createAdminForm(settings: MenuSimpleConfigInterface): void {
  }
}
