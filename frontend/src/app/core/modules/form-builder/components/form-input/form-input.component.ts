import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StringService} from '../../../../services/string.service';
import {NewInputDescriptionInterface} from '../../interfaces/new-input-description-interface';
import {BaseInput} from '../../class/base-input';
import {MatDialog} from '@angular/material/dialog';
import {MoveableModalComponent} from '../../../../components/moveable-modal/moveable-modal.component';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
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
    const adminComponent = this.formData.adminComponent;
    const dialogRef = this.dialog.open(adminComponent, {
      data: this.formData,
      width: '25%',
      position: {top: '110px'}
    });
  }
}
