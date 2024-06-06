import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {
  }

  createForm(formFields: {}, settings: any): FormGroup {
    const form = this.formBuilder.group(formFields);
    if (settings) {
      form.patchValue(settings);
    }
    form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        const formValue = form.value as any;
        Object.assign(settings, formValue);
      }
    });
    return form;
  }
}
