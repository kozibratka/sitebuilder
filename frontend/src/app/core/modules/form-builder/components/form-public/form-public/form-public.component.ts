import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseInput} from '../../../class/base-input';
import {TextInput} from '../../../class/text-input';
import * as _ from 'underscore';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-public',
  templateUrl: './form-public.component.html',
  styleUrls: ['./form-public.component.css']
})
export class FormPublicComponent implements OnInit{
  @Input() formData: Array<Array<BaseInput>> = [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()]];
  form: FormGroup;
  @Input()isSend = false;
  trySubmit = false;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();


  constructor(
    private fb: FormBuilder
  ) {
  }

  static initForm(formData: Array<Array<BaseInput>>, fb: FormBuilder) {
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
    return fb.group(
      formControls,
    );
  }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.form = FormPublicComponent.initForm(this.formData, this.fb);
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
