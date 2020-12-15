import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SymfonyApiClientService} from '../services/symfony-api/symfony-api-client.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiFormService {

  constructor(
    protected formBuilder: FormBuilder,
    protected symfonyApiClientService: SymfonyApiClientService
  ) {
  }

  abstract createForm(): FormGroup;

  createValidator(path: string, expectedHttpStatus = 201): (AbstractControl) => Observable<ValidationErrors | null> {
    return (abstractControl: AbstractControl) => {
      return new Observable<ValidationErrors | null>(validationSubscriber => {
        if (abstractControl.touched) {
          this.symfonyApiClientService.post<{}>(path, abstractControl.value, {validform: 'true'}).subscribe((httpResponse) => {
            const body = httpResponse.body;
            if (httpResponse.status !== expectedHttpStatus && Object.keys(body).length) {
              this.supplyValidationErrors(body, abstractControl);
            }
            validationSubscriber.next(null);
            validationSubscriber.complete();
          });
        }
      });
    };
  }

  supplyValidationErrors(validationErrors: {}, abstractControl: AbstractControl): void {
    const iterate = (errors, form: AbstractControl) => {
      Object.keys(errors).forEach(key => {
        if (Array.isArray(errors[key])){
          form.get(key).setErrors(errors[key], {emitEvent: true});
        } else  {
          iterate(errors[key], form.get(key));
        }
      });
    };
    iterate(validationErrors, abstractControl);
  }
}
