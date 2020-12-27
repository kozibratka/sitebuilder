import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractApiFormService} from '../../../../../../core/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService extends AbstractApiFormService{
  createForm(): FormGroup {
    return this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: this.formBuilder.group({
        first: '',
        second: ''
      }),
    }, {asyncValidators: this.createValidator('user_registration'), updateOn: 'submit'});
  }

}
