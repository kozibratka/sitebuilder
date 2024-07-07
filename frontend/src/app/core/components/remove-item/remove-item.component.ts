import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-remove-item',
  standalone: true,
  templateUrl: './remove-item.component.html',
  imports: [
    DialogComponent
  ],
  styleUrls: ['./remove-item.component.css']
})
export class RemoveItemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) {
  }
}
