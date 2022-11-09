import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../core/services/form/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class WebFormService extends AbstractApiFormService{
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    return this.formBuilder.group({
      name: ['']
    }, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
  }

}
