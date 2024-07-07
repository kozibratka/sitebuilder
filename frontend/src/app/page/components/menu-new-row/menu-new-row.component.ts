import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-new-row',
  standalone: true,
  templateUrl: './menu-new-row.component.html',
  imports: [
    CommonModule,
    MatIcon
  ],
  styleUrls: ['./menu-new-row.component.css']
})
export class MenuNewRowComponent {
  @Output() numColumns = new EventEmitter<number>();

}
