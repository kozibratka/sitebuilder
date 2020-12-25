import { Component, OnInit } from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-global-form-error-message',
  templateUrl: './global-form-error-message.component.html',
  styleUrls: ['./global-form-error-message.component.css']
})
export class GlobalFormErrorMessageComponent implements OnInit {

  private _errors: ValidationErrors = {};
  objectKeys = Object.keys;

  constructor() {

  }

  ngOnInit(): void {
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  set errors(value: ValidationErrors) {
    this._errors = value;
  }

}
