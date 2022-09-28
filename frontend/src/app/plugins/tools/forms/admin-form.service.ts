import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../shared/core/services/form/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminFormService extends AbstractApiFormService {
  formRoute: string;

  createForm(querySegment): FormGroup {
    return this.formBuilder.group({
      name: ''
    }, {asyncValidators: this.createValidator(this.formRoute, querySegment), updateOn: 'submit'});
  }
}
