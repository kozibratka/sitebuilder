import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../core/services/form/abstract-class/abstract-api-form-service';
import {ApiFormService} from "../../core/services/form/api-form.service";

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
    }, {updateOn: 'submit'});
    if (allowTemplate) {
      form.addControl('isTemplate',new FormControl(''));
    }
    return form;
  }

}
