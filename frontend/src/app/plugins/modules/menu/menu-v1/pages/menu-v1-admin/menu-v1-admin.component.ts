import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuV1ConfigInterface} from '../../interfaces/menu-v1-config-interface';
import {MatDialog} from '@angular/material/dialog';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {ArrayHelper} from '../../../../../../core/helpers/array-helper';
import {MenuV1ItemSettingsComponent} from '../../components/menu-v1-item-settings/menu-v1-item-settings.component';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-v1-admin.component.html',
  styleUrls: ['./menu-v1-admin.component.css']
})
export class MenuV1AdminComponent extends AbstractAdminSetting<MenuV1ConfigInterface> implements OnInit, OnDestroy{

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

  addMenuItem() {
    const newMenuItem = {level: 0, idPage: 0, name: '', children: []};
    const dialogRef = this.dialog.open(MenuV1ItemSettingsComponent);
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

  createAdminForm(settings: MenuV1ConfigInterface): void {
  }
}