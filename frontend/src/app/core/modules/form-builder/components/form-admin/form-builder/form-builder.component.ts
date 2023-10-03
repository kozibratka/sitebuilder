import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import {NewInputDescriptionInterface} from '../../../interfaces/new-input-description-interface';
import {Selectbox} from '../../../class/selectbox';
import {Textarea} from '../../../class/textarea';
import {Checkbox} from '../../../class/checkbox';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormPublicComponent} from '../../form-public/form-public/form-public.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  @Input() isAdmin = true;

  @Output() refresh = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = FormPublicComponent.initForm(this.formData, this.fb);
  }

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
      case 'Checkbox':
        typeInput = new Checkbox();
        break;
    }


    if (x === -1) {
      this.formData.push([typeInput]);
      this.refresh.emit(true);
      return;
    }
    const position = data.position === 'right' ? y + 1 : y;
    this.formData[x].splice(position, 0, typeInput);
    this.refresh.emit(true);
  }

  deleteInput(x: number, y: number) {
    this.formData[x].splice(y, 1);
    if (!this.formData[x].length) {
      this.formData.splice(x, 1);
    }
    this.refresh.emit(true);
  }
}
