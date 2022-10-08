import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../shared/core/services/form/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService extends AbstractApiFormService {
  formRoute: string;

  createForm(querySegment, formFields: {}): FormGroup {
    let fields = {
      name: ['']
    };
    if (formFields) {
      fields = {...fields, ...formFields};
    }

    return this.formBuilder.group(fields, {asyncValidators: this.createValidator(this.formRoute, querySegment), updateOn: 'submit'});
  }
}
