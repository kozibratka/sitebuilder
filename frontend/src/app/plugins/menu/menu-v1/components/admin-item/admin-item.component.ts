import {Component, Input} from '@angular/core';
import {SortableOptions} from 'sortablejs';
import {MatDialog} from '@angular/material/dialog';
import {ItemInterface} from '../../interfaces/item-interface';
import {AdminComponent} from '../../pages/admin/admin.component';
import {RemoveItemDialogComponent} from '../remove-item-dialog/remove-item-dialog.component';
import {ItemSettingsComponent} from '../item-settings/item-settings.component';

@Component({
  selector: 'app-menu-admin-item',
  templateUrl: './admin-item.component.html',
  styleUrls: ['./admin-item.component.css']
})
export class AdminItemComponent {
  @Input() items: any[];
  @Input() options: SortableOptions;


  constructor(
    private menuAdminComponent: AdminComponent,
    private dialog: MatDialog
  ) {
  }

  remove(sourceArray: [], index: number) {
    this.dialog.open(RemoveItemDialogComponent).afterClosed().subscribe(value => {
      if (value) {
        this.menuAdminComponent.removeItem(sourceArray, index);
      }
    });
  }

  settings(item: ItemInterface) {
    const dialogRef = this.dialog.open(ItemSettingsComponent, {data: item});
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
