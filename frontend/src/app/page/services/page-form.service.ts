import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../core/services/form/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class PageFormService extends AbstractApiFormService{
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    return this.formBuilder.group({
      name: [''],
      url: [''],
      description: ['']
    }, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
  }

}
