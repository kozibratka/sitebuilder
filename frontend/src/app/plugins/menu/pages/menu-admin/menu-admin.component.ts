import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {MatDialog} from '@angular/material/dialog';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {MenuItemSettingsComponent} from '../../components/menu-item-settings/menu-item-settings.component';
import {MenuAdminItemComponent} from "../../components/menu-admin-item/menu-admin-item.component";
import {MatButton} from "@angular/material/button";
import { SortablejsModule } from 'nxt-sortablejs'

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  templateUrl: 'menu-admin.component.html',
  imports: [
    MenuAdminItemComponent,
    MatButton,
    SortablejsModule
  ],
  styleUrls: ['menu-admin.component.css']
})
export class MenuAdminComponent extends AbstractAdminSetting<MenuConfigInterface> implements OnInit, OnDestroy{

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
  }

  removeItem(sourceArray: [], index: number) {
    sourceArray.splice(index, 1);
    this.refreshSettings();
  }

  refreshSettings() {
    this.settings.items = ArrayHelper.flatNestedArrayObject(this.items);
    this.contextObject.refreshView();
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

  createAdminForm(settings: MenuConfigInterface): void {
  }
}
