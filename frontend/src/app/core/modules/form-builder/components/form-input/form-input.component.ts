import {Component, Input} from '@angular/core';
import {BaseInput} from '../../class/base-input';
import {StringService} from '../../../../services/string.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
  @Input() formData: BaseInput;
  uniqueId = StringService.randomString();
  showPanel = false;
}
