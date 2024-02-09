import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../core/services/form/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class WebFormService extends AbstractApiFormService{
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string, options?: {allowTemplate: boolean}}): FormGroup {
    let form: FormGroup =  this.formBuilder.group({
      name: [''],
    }, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
    if (data.options?.allowTemplate) {
      form.addControl('isTemplate',new FormControl(''));
    }
    return form;
  }

}
