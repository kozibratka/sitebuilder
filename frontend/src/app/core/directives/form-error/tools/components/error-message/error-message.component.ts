import { Component, OnInit } from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  private _errors: ValidationErrors;
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
