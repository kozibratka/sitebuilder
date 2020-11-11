import { Component, OnInit } from '@angular/core';
import {LoginClientService} from '../../../../core/services/login-client/login-client.service';
import {RegisterTypeService} from './tools/types/register-type.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.registerTypeService.createForm();

  constructor(private loginClientService: LoginClientService, private registerTypeService: RegisterTypeService) {

  }

  ngOnInit(): void {
  }

  sendForm() {
    let valid = this.registrationForm.valid;
    console.log(valid);
  }

}
