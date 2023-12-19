import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-menu-new-row',
  templateUrl: './menu-new-row.component.html',
  styleUrls: ['./menu-new-row.component.css']
})
export class MenuNewRowComponent {
  @Output() numColumns = new EventEmitter<number>();

}
