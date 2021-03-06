import {Component, OnInit} from '@angular/core';
import {LoginClientService} from '../../../../core/services/login-client/login-client.service';
import {RegisterFormService} from './tools/forms/register-form.service';
import {FormGroup} from '@angular/forms';
import {SymfonyApiClientService} from '../../../../core/services/symfony-api/symfony-api-client.service';
import {Router} from '@angular/router';
import {HttpResponseToasterService} from '../../../../core/services/http-response-toaster.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private loginClientService: LoginClientService,
    private registerTypeService: RegisterFormService,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService
  ) {
    this.registrationForm = this.registerTypeService.createForm();
    this.registrationForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        symfonyApiClientService.post('user_registration', this.registrationForm.value).subscribe(httpResponse => {
          this.loginClientService.tryLogin(this.registrationForm.get('email').value,
            this.registrationForm.get('password').get('first').value).subscribe({
              next: () => this.router.navigate(['/admin']),
              error: err => this.httpResponseToasterService.showError(err)
            });
        });
      }
      else if (status === 'INVALID') {
        this.registrationForm.get('password').get('first').reset(
          this.registrationForm.get('password').get('first').value, {onlySelf: true, emitEvent: false}
          );
      }
    });
  }

  ngOnInit(): void {
  }
}
