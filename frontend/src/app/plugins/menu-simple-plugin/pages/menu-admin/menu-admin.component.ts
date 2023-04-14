import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {MenuSimpleConfigInterface} from '../../interfaces/menu-simple-config-interface';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {MenuItemSettingsComponent} from '../../components/menu-item-settings/menu-item-settings.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent extends AbstractAdminSetting<MenuSimpleConfigInterface> implements OnInit, OnDestroy{

  items = [];
  options;

  constructor(
    private dialog: MatDialog
  ) {
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
    this.items = ArrayHelper.objectWithLevelToNestedArray(this.settings.menuSimpleItems);
  }

  ngOnDestroy(): void {
    ArrayHelper.recalculateNestedArrayObjectLevel(this.items, true);
  }

  removeItem(sourceArray: [], index: number) {
    sourceArray.splice(index, 1);
    this.refreshSettings();
  }

  refreshSettings() {
    this.settings.menuSimpleItems = ArrayHelper.flatNestedArrayObject(this.items);
  }

  addMenuItem() {
    const newMenuItem = {level: 0, idPage: 0, name: '', children: []};
    const dialogRef = this.dialog.open(MenuItemSettingsComponent);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        const formSettings = dialogRef.componentInstance.settings;
        if (formSettings.valid) {
          Object.assign(newMenuItem, formSettings.value);
          this.items.push(newMenuItem);
          this.refreshSettings();
        }
      }
    });
  }

  createAdminForm(settings: MenuSimpleConfigInterface): void {
  }
}
