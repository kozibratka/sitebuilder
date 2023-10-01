import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewInputDescriptionInterface} from '../../../interfaces/new-input-description-interface';
import {StringService} from '../../../../../services/string.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent {
  @Input() formData: any;
  @Input() isNewRowInput = false;
  @Input() isAdmin = true;

  @Output() newInput: EventEmitter<NewInputDescriptionInterface> = new EventEmitter();
  @Output() removeInput: EventEmitter<boolean> = new EventEmitter();
  uniqueId = StringService.randomString();
  showPanel = false;


  constructor(
    public dialog: MatDialog
  ) {
  }

  addNewInput(data: NewInputDescriptionInterface) {
    this.newInput.emit(data);
  }

  deleteInput() {
    this.removeInput.emit(true);
  }

  settings() {
    const adminComponent = this.formData.getAdminComponent();
    const dialogRef = this.dialog.open(adminComponent, {
      data: this.formData,
      width: '35%',
      position: {top: '110px'}
    });
  }
}
