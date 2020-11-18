import { Component, OnInit } from '@angular/core';
import {LoginFormService} from './tools/forms/login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginFormService: LoginFormService) {
    let loginForm = this.loginFormService.createForm();
    loginForm.statusChanges.subscribe()
    if (status === 'VALID') {

    }
  }

  ngOnInit(): void {
  }

}
