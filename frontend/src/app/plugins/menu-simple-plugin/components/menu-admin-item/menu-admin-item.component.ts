import {Component, Host, Input} from '@angular/core';
import {SortableOptions} from 'sortablejs';
import {MenuAdminComponent} from '../../pages/menu-admin/menu-admin.component';
import {MatDialog} from '@angular/material/dialog';
import {RemoveMenuItemDialogComponent} from '../remove-menu-item-dialog/remove-menu-item-dialog.component';

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
}
