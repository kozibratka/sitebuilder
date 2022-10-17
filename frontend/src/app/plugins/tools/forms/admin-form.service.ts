import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../shared/core/services/form/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService extends AbstractApiFormService {
  formRoute: string;

  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    let fields = {
      name: ['']
    };
    if (data.formFields) {
      fields = {...fields, ...data.formFields};
    }

    return this.formBuilder.group(fields, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
  }
}
