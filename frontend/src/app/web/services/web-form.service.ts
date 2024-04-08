import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WebFormService{
  constructor(
    protected formBuilder: FormBuilder,
  ) {
  }

  createForm(allowTemplate: boolean = false): FormGroup {
    let form: FormGroup =  this.formBuilder.group({
      name: [''],
      domains: this.formBuilder.array([this.formBuilder.group({name: ['']})]),
    }, {updateOn: 'submit'});
    if (allowTemplate) {
      form.addControl('isTemplate',new FormControl(''));
    }
    return form;
  }

}
