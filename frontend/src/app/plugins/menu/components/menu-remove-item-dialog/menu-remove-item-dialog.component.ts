import { Component } from '@angular/core';
import {DialogComponent} from "../../../../core/components/dialog/dialog.component";

@Component({
  selector: 'app-remove-menu-item-dialog',
  standalone: true,
  templateUrl: 'menu-remove-item-dialog.component.html',
  imports: [
    DialogComponent
  ],
  styleUrls: ['menu-remove-item-dialog.component.css']
})
export class MenuRemoveItemDialogComponent {

}
