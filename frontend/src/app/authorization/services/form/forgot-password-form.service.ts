import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordFormService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required]
    }, {updateOn: 'submit'});
  }
}
