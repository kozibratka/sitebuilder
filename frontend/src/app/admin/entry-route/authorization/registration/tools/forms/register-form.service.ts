import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../../../../../shared/core/services/form/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService extends AbstractApiFormService{
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    return this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: this.formBuilder.group({
        first: '',
        second: ''
      }),
    }, {asyncValidators: this.createValidator(data), updateOn: 'submit'});
  }

}
