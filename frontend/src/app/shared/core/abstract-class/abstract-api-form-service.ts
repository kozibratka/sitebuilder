import {AbstractControl, FormBuilder, FormGroup, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {SymfonyApiClientService} from '../services/symfony-api/symfony-api-client.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiFormService {

  constructor(
    protected formBuilder: FormBuilder,
    protected symfonyApiClientService: SymfonyApiClientService
  ) {
  }

  abstract createForm(querySegment?: (string | number)[]): FormGroup;

  createValidator(path: string, querySegment?: (string | number)[]): (AbstractControl) => Observable<ValidationErrors | null> {
    return (abstractControl: AbstractControl) => {
      return new Observable<ValidationErrors | null>(validationSubscriber => {
        if (abstractControl.touched) {
          this.symfonyApiClientService.post<{}>(path, abstractControl.value, querySegment, {validform: 'true'}).subscribe(
            {error: (err: HttpErrorResponse) => {
                if (err.status === 400 && err.headers.get('Content-Type') === 'application/invalid-form+json') {
                  this.supplyValidationErrors(err.error, abstractControl);
                  validationSubscriber.next(null);
                  validationSubscriber.complete();
                }
              },
              next: val => {
                validationSubscriber.next(null);
                validationSubscriber.complete();
              }
            });
        }
        else {
          setTimeout(() => {
            validationSubscriber.next(null);
            validationSubscriber.complete();
          }, 0);
        }
      });
    };
  }

  supplyValidationErrors(validationErrors: {}, abstractControl: AbstractControl): void {
    const baseErrors: string[] = [];
    const iterate = (errors, form: AbstractControl) => {
      Object.keys(errors).forEach(key => {
        if (Array.isArray(errors[key])){
          form.get(key).setErrors(errors[key], {emitEvent: true});
        }
        else if (typeof errors[key] === 'string') {
          baseErrors.push(errors[key]);
        }
        else  {
          iterate(errors[key], form.get(key));
        }
      });
    };
    iterate(validationErrors, abstractControl);
    if (baseErrors.length) {
      abstractControl.setErrors(baseErrors, {emitEvent: true});
    }
  }
}
