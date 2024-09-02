import {AfterContentInit, Component, ContentChild, ElementRef, Input} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {FormGroupDirective, NgForm} from "@angular/forms";

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
  @ContentChild('submit') submit?: ElementRef;

  constructor(public dialogRef: MatDialogRef<any>) { }


  onSubmit() {
    if (this.submit) {
      this.submit.nativeElement.click();
    } else {
      this.dialogRef.close(this.saveData);
    }
  }
}
