import {Component, Input} from '@angular/core';
import {SortableOptions} from 'sortablejs';
import {MenuAdminComponent} from '../../pages/menu-admin/menu-admin.component';
import {MatDialog} from '@angular/material/dialog';
import {RemoveMenuItemDialogComponent} from '../remove-menu-item-dialog/remove-menu-item-dialog.component';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {MenuItemSettingsComponent} from '../menu-item-settings/menu-item-settings.component';

@Component({
  selector: 'app-menu-admin-item',
  templateUrl: './menu-admin-item.component.html',
  styleUrls: ['./menu-admin-item.component.css']
})
export class MenuAdminItemComponent {
  @Input() items: any[];
  @Input() options: SortableOptions;


  constructor(
    private menuAdminComponent: MenuAdminComponent,
    private dialog: MatDialog
  ) {
  }

  remove(sourceArray: [], index: number) {
    this.dialog.open(RemoveMenuItemDialogComponent).afterClosed().subscribe(value => {
      if (value) {
        this.menuAdminComponent.removeItem(sourceArray, index);
      }
    });
  }

  settings(item: MenuItemInterface) {
    const dialogRef = this.dialog.open(MenuItemSettingsComponent, {data: {item, pages: {}}});
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        const formSettings = dialogRef.componentInstance.settings;
        if (formSettings.valid) {
          Object.assign(item, formSettings.value);
        }
      }
    });
  }
}
