import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BasePlugSettingsinInterface} from '../interfaces/base-plug-settingsin-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService {
  formRoute: string;


  constructor(private formBuilder: FormBuilder) {
  }

  createForm(formFields: {}, settings: BasePlugSettingsinInterface): FormGroup {
    const form = this.formBuilder.group(formFields);
    form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        const formValue = form.value as BasePlugSettingsinInterface;
        Object.assign(settings, formValue);
      }
    });
    return form;
  }
}
