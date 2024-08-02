import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WebInterface} from "../interfaces/web-interface";

@Injectable({
  providedIn: 'root'
})
export class WebFormService{
  constructor(
    protected formBuilder: FormBuilder,
  ) {
  }

  createForm(allowTemplate: boolean = false, webInterface: WebInterface = null): FormGroup {
    let form: FormGroup =  this.formBuilder.group({
      name: [''],
      domains: this.formBuilder.array([]),
    }, {updateOn: 'submit'});
    if (allowTemplate) {
      form.addControl('isTemplate',new FormControl(''));
    }
    if (webInterface?.domains.length) {
      webInterface.domains.forEach(value => {
        this.addDomain(form)
      })
    }
    return form;
  }

  addDomain(formGroup: FormGroup) {
    (formGroup.get('domains') as FormArray).push(this.formBuilder.group({name: ['']}));
  }

  removeDomain(formGroup: FormGroup, index: number) {
    (formGroup.get('domains') as FormArray).removeAt(index);
  }

}
