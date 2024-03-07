import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PluginFormService{
  constructor(
    protected formBuilder: FormBuilder,
  ) {
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['']
    }, {updateOn: 'submit'});
  }

}
