import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService {
  formRoute: string;


  constructor(private formBuilder: FormBuilder) {
  }

  createForm(formFields: {}, settings: BasePlugConfigInterface): FormGroup {
    const form = this.formBuilder.group(formFields);
    form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        const formValue = form.value as BasePlugConfigInterface;
        Object.assign(settings, formValue);
      }
    });
    if (settings) {
      form.patchValue(settings);
    }
    return form;
  }
}
