import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import {NewInputDescriptionInterface} from '../../../interfaces/new-input-description-interface';
import {Selectbox} from '../../../class/selectbox';
import {Textarea} from '../../../class/textarea';
import {Checkbox} from '../../../class/checkbox';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FormPublicComponent} from '../../form-public/form-public/form-public.component';
import {Button} from '../../../class/button';
import {FormService} from "../../../services/form.service";
import {ObjectHelper} from "../../../../../helpers/object-helper";
import {ArrayHelper} from "../../../../../helpers/array-helper";
import {FormInputComponent} from "../form-input/form-input.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-form-builder',
  standalone: true,
  templateUrl: './form-builder.component.html',
  imports: [
    CommonModule,
    FormInputComponent
  ],
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit{
  @Input() formRawData: any[][] = [];
  formInputs: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  @Input() isAdmin = true;

  @Output() refresh = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {
  }

  ngOnInit(): void {
      this.formInputs = this.formService.createInputsFromRaw(this.formRawData);
  }

  refreshRawData() {
    let rawData = ObjectHelper.copyToRaw(this.formInputs);
    ArrayHelper.reinitArray(this.formRawData, rawData);
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
      case 'Button':
        typeInput = new Button();
        break;
    }


    if (x === -1) {
      this.formInputs.push([typeInput]);
      this.refreshRawData();
      this.refresh.emit(true);
      return;
    }
    const position = data.position === 'right' ? y + 1 : y;
    this.formInputs[x].splice(position, 0, typeInput);
    this.refreshRawData();
    this.refresh.emit(true);
  }

  deleteInput(x: number, y: number) {
    this.formInputs[x].splice(y, 1);
    if (!this.formInputs[x].length) {
      this.formInputs.splice(x, 1);
    }
    this.refreshRawData();
    this.refresh.emit(true);
  }
}
