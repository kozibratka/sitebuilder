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

  items1 = [1, 2, 3, 4, 5];
  items2 = ['a', 'b', 'c', 'd', 'e'];

  list = [
    {name: 1, list: [
        {name: 3, list: []}
      ]},
    {name: 2, list: []}];


  list2 = {name: 'Table', list: [
      {name: 1, list: [
          {name: 3, list: []}
        ]},
      {name: 2, list: []}]};
  depth = 1;

  isArray(data): boolean {
    return Array.isArray(data);
  }

  datetime() {
    const d = new Date();
    return d.toString();
  }
}
