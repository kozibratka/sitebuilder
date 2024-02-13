import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() saveButtonShow = true;
  @Input() saveData: any = true;
}
