import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../../../../../../shared/core/services/form/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PageFormService extends AbstractApiFormService{
  createForm(querySegment?: (string | number)[]): FormGroup {
    return this.formBuilder.group({
      name: ['']
    }, {asyncValidators: this.createValidator('page_create', querySegment), updateOn: 'submit'});
  }

}
