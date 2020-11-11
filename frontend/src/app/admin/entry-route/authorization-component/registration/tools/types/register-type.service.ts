import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterTypeService {

  constructor(private formBuilder: FormBuilder) {
  }

  createForm(): FormGroup {
    let form =  this.formBuilder.group({
      fullName: [''],
      email: [''],
      passwordFirst: [''],
      passwordSecond: ['']
    }, {asyncValidators: this.createValidator(), updateOn: 'submit'});
    form.updateValueAndValidity();
    return form;
  }

  createValidator(): (AbstractControl) => Observable<ValidationErrors | null> {
    return (abstractControl: AbstractControl) => {
      return new Observable<ValidationErrors | null>(subscriber => {
        abstractControl.setErrors({gagwag: 'wagawg'});

        subscriber.next(null);
      });
    };
  }

}
