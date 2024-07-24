import { Component, OnInit } from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  standalone: true,
  styleUrls: ['./error-message.component.css'],
  imports: [
    CommonModule
  ]
})
export class ErrorMessageComponent implements OnInit {

  private _errors: ValidationErrors;
  objectKeys = Object.keys;

  constructor() {
  }

  ngOnInit(): void {
  }

  getMessage(index: string, errors) {
    let message = '';
    switch (index) {
      case 'required':
        message = 'Toto pole je povinné';
        break;
      default:
        message = errors[index];
        break;
    }

    return message;
  }

  get errors(): ValidationErrors {
    return this._errors;
  }

  set errors(value: ValidationErrors) {
    this._errors = value;
  }
}
