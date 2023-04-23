import {Component, Input} from '@angular/core';
import {SortableOptions} from 'sortablejs';
import {MatDialog} from '@angular/material/dialog';
import {MenuV1ItemInterface} from '../../interfaces/menu-v1-item-interface';
import {MenuV1AdminComponent} from '../../pages/menu-v1-admin/menu-v1-admin.component';
import {MenuV1ItemSettingsComponent} from '../menu-v1-item-settings/menu-v1-item-settings.component';
import {MenuV1RemoveItemDialogComponent} from '../menu-v1-remove-item-dialog/menu-v1-remove-item-dialog.component';

@Component({
  selector: 'app-menu-admin-item',
  templateUrl: './menu-v1-admin-item.component.html',
  styleUrls: ['./menu-v1-admin-item.component.css']
})
export class MenuV1AdminItemComponent {
  @Input() items: any[];
  @Input() options: SortableOptions;


  constructor(
    private menuAdminComponent: MenuV1AdminComponent,
    private dialog: MatDialog
  ) {
  }

  remove(sourceArray: [], index: number) {
    this.dialog.open(MenuV1RemoveItemDialogComponent).afterClosed().subscribe(value => {
      if (value) {
        this.menuAdminComponent.removeItem(sourceArray, index);
      }
    });
  }

  settings(item: MenuV1ItemInterface) {
    const dialogRef = this.dialog.open(MenuV1ItemSettingsComponent, {data: item});
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
