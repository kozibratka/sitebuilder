import {Component, Input} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatButton,
    MatDialogClose
  ],
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() saveButtonShow = true;
  @Input() saveData: any = true;
}
