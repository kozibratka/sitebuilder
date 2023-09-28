import {Component, Input} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';

@Component({
  selector: 'app-form-public',
  templateUrl: './form-public.component.html',
  styleUrls: ['./form-public.component.css']
})
export class FormPublicComponent {
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
}
