import {Component, Input} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import {NewInputDescriptionInterface} from '../../../interfaces/new-input-description-interface';
import {Selectbox} from '../../../class/selectbox';
import {Textarea} from '../../../class/textarea';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  @Input() isAdmin = true;

  addInput(data: NewInputDescriptionInterface, x: number, y: number) {
    let typeInput: BaseInput = null;
    switch (data.type) {
      case 'TextInput':
        typeInput = new TextInput();
        break;
      case 'Selectbox':
        typeInput = new Selectbox();
        break;
      case 'Textarea':
        typeInput = new Textarea();
        break;
    }


    if (x === -1) {
      this.formData.push([typeInput]);
      return;
    }
    const position = data.position === 'right' ? y + 1 : y;
    this.formData[x].splice(position, 0, typeInput);
  }

  deleteInput(x: number, y: number) {
    this.formData[x].splice(y, 1);
    if (!this.formData[x].length) {
      this.formData.splice(x, 1);
    }
  }
}
