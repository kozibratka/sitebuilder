import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../../../../core/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TextPluginFormService extends AbstractApiFormService {
  createForm(): FormGroup {
    return this.formBuilder.group({
      text: [''],
    }, {asyncValidators: this.createValidator('user_registration'), updateOn: 'submit'});
  }
}
