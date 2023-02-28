import {Component, Input} from '@angular/core';
import {SortableOptions} from 'sortablejs';

@Component({
  selector: 'app-menu-admin-item',
  templateUrl: './menu-admin-item.component.html',
  styleUrls: ['./menu-admin-item.component.css']
})
export class MenuAdminItemComponent {
  @Input() items: any[];
  @Input() options: SortableOptions;

  isArray(data): boolean {
    return Array.isArray(data);
  }
}
