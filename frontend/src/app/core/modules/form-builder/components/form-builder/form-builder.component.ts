import {Component, Input} from '@angular/core';
import {BaseInput} from '../../class/base-input';
import {TextInput} from '../../class/text-input';
import {NewInputDescriptionInterface} from '../../interfaces/new-input-description-interface';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];

  addInput(data: NewInputDescriptionInterface, x: number, y: number) {
    console.log(data, x, y);
  }
}
