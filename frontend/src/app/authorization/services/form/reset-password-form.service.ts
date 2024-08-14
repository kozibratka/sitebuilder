import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordFormService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  createForm(): FormGroup {
    return this.formBuilder.group({
      password: this.formBuilder.group({
        first: '',
        second: ''
      }),
    }, {updateOn: 'submit'});
  }
}
