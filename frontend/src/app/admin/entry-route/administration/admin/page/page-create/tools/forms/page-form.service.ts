import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../../../../../../shared/core/services/form/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PageFormService extends AbstractApiFormService{
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    return this.formBuilder.group({
      name: ['']
    }, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
  }

}
