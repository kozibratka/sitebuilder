import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseInput} from '../../class/base-input';
import {StringService} from '../../../../services/string.service';
import {NewInputDescriptionInterface} from '../../interfaces/new-input-description-interface';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
  @Input() formData: BaseInput;

  @Output() newInput: EventEmitter<NewInputDescriptionInterface> = new EventEmitter();
  uniqueId = StringService.randomString();
  showPanel = false;

  addNewInput(data: NewInputDescriptionInterface) {
    this.newInput.emit(data);
  }
}
