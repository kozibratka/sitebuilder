import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NewsletterFormService {

  constructor(private formBuilder: FormBuilder) {
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
    }, {updateOn: 'submit'});
  }
}
