import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PageFormService{
  constructor(private formBuilder: FormBuilder) {
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      url: [''],
      description: [''],
      homePage: [false]
    }, {updateOn: 'submit'});
  }

}
