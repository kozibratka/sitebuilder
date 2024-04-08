import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {SymfonyApiClientService} from "../api/symfony-api/symfony-api-client.service";
import {HttpErrorResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {HttpResponseToasterService} from "../http-response-toaster.service";

@Injectable({
  providedIn: 'root'
})
export class ApiFormService {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
  ) { }

  send(path: string, form: AbstractControl, querySegment?: {}) {
    return this.symfonyApiClientService.post<any>(path, form.value, querySegment).pipe(tap(next => {

      },
      (err: HttpErrorResponse) => {
        if (err.status === 400 && err.headers.get('Content-Type') === 'application/invalid-form+json') {
          this.supplyValidationErrors(err.error, form);
        } else {
          this.httpResponseToasterService.showError(err)
        }
      }
    ));
  }

  supplyValidationErrors(validationErrors: {}, abstractControl: AbstractControl): void {
    const baseErrors: string[] = [];
    const iterate = (errors, form: AbstractControl) => {
      Object.keys(errors).forEach(key => {
        if (Array.isArray(errors[key])){
          if (typeof errors[key][0] === 'string') {
            form.get(key).setErrors(errors[key], {emitEvent: true});
          } else {
            iterate(errors[key], form.get(key));
          }
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
