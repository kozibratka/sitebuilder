import { Injectable } from '@angular/core';
import {AbstractApiFormService} from '../../../../../../core/abstract-class/abstract-api-form-service';
import {FormGroup, Validators} from '@angular/forms';

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
