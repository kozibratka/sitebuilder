import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../../../../../../../core/abstract-class/abstract-api-form-service';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WebFormService extends AbstractApiFormService{
  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['']
    }, {asyncValidators: this.createValidator('web_create'), updateOn: 'submit'});
  }

}
