import { Component, OnInit } from '@angular/core';
import {LoginClientService} from '../../../../core/services/login-client/login-client.service';
import {RegisterFormService} from './tools/forms/register-form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private loginClientService: LoginClientService, private registerTypeService: RegisterFormService) {
    this.registrationForm = this.registerTypeService.createForm();
    this.registrationForm.statusChanges.subscribe(value => {
      console.log(value);
      console.log(this.registrationForm.get('email'));
      if (value === 'VALID'){
        console.log('validní...muzu odeslat');
      }
    });
  }

  ngOnInit(): void {
  }
}
