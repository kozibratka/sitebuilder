import { Component } from '@angular/core';
import {DialogComponent} from "../../../core/components/dialog/dialog.component";

@Component({
  selector: 'app-remove-grid-item-dialog',
  standalone: true,
  templateUrl: './remove-grid-item-dialog.component.html',
  imports: [
    DialogComponent
  ],
  styleUrls: ['./remove-grid-item-dialog.component.css']
})
export class RemoveGridItemDialogComponent {

}
