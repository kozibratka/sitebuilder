import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortableOptions} from 'sortablejs';
import {MatDialog} from '@angular/material/dialog';
import {MenuItemInterface} from '../../interfaces/menu-item-interface';
import {MenuAdminComponent} from '../../pages/menu-admin/menu-admin.component';
import {MenuRemoveItemDialogComponent} from '../menu-remove-item-dialog/menu-remove-item-dialog.component';
import {MenuItemSettingsComponent} from '../menu-item-settings/menu-item-settings.component';
import EventReceiver from "../../../../../../assets/admin_lte/plugins/filterizr/EventReceiver";

@Component({
  selector: 'app-menu-admin-item',
  templateUrl: 'menu-admin-item.component.html',
  styleUrls: ['menu-admin-item.component.css']
})
export class MenuAdminItemComponent {
  @Input() items: any[];
  @Input() options: SortableOptions;
  @Output() updated = new EventEmitter<boolean>();


  constructor(
    private menuAdminComponent: MenuAdminComponent,
    private dialog: MatDialog
  ) {
  }

  remove(sourceArray: [], index: number) {
    this.dialog.open(MenuRemoveItemDialogComponent).afterClosed().subscribe(value => {
      if (value) {
        this.menuAdminComponent.removeItem(sourceArray, index);
      }
    });
  }

  settings(item: MenuItemInterface) {
    const dialogRef = this.dialog.open(MenuItemSettingsComponent, {data: item});
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        const formData = dialogRef.componentInstance.formData;
        if (formData) {
          Object.assign(item, formData);
          this.updated.emit(true);
        }
      }
    });
  }
}
