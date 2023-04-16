import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigInterface} from '../../interfaces/config-interface';
import {MatDialog} from '@angular/material/dialog';
import {ItemSettingsComponent} from '../../components/item-settings/item-settings.component';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {ArrayHelper} from '../../../../../../core/helpers/array-helper';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent extends AbstractAdminSetting<ConfigInterface> implements OnInit, OnDestroy{

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
    const dialogRef = this.dialog.open(ItemSettingsComponent);
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

  createAdminForm(settings: ConfigInterface): void {
  }
}
