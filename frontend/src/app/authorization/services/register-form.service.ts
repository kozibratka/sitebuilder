import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService{

  constructor(private formBuilder: FormBuilder) {
  }
  createForm(data: {querySegment?: {}, formFields?: {}, path?: string}): FormGroup {
    return this.formBuilder.group({
      fullName: [''],
      email: [''],
      password: this.formBuilder.group({
        first: '',
        second: ''
      }),
    }, {updateOn: 'submit'});
  }

}
