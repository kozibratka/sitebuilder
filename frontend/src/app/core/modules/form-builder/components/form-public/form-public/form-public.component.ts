import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import * as _ from 'underscore';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormService} from "../../../services/form.service";
import {CommonModule, NgSwitch} from "@angular/common";

@Component({
  selector: 'app-form-public',
  standalone: true,
  templateUrl: './form-public.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSwitch
  ],
  styleUrls: ['./form-public.component.css']
})
export class FormPublicComponent implements OnInit{
  @Input() formRawData: any[][] = [];
  formInputs: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  form: FormGroup;
  @Input()isSend = false;
  trySubmit = false;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();


  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {
  }

  initForm(formData: Array<Array<BaseInput>>) {
    const flatFormData = _.flatten(formData);
    let formControls = {};
    flatFormData.forEach((data: BaseInput) => {
      const form = data.createForm();
      if (Array.isArray(form)) {
        formControls = Object.assign(formControls, ...form);
      } else {
        formControls = Object.assign(formControls, form);
      }
    });
    return this.fb.group(
      formControls,
    );
  }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.formInputs = this.formService.createInputsFromRaw(this.formRawData);
    this.form = this.initForm(this.formInputs);
  }
  submitForm() {
    this.trySubmit = true;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    }
  }
  getFormField(name: string) {
    return this.form.get(name);
  }
}
