import { Injectable } from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {AbstractApiFormService} from '../../core/services/form/abstract-class/abstract-api-form-service';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService extends AbstractApiFormService {
  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }, {updateOn: 'submit'});
  }
}
