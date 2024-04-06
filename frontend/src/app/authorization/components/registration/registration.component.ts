import {Component, OnInit} from '@angular/core';
import {RegisterFormService} from '../../services/register-form.service';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginClientService} from '../../services/login-client.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  activationSend = false;

  constructor(
    private loginClientService: LoginClientService,
    private registerTypeService: RegisterFormService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
    private apiFormService: ApiFormService,
  ) {
    this.registrationForm = this.registerTypeService.createForm({path: 'user_registration'});
    this.registrationForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('user_registration', this.registrationForm).subscribe(httpResponse => {
          // this.activationSend = true;
          this.loginClientService.tryLogin(this.registrationForm.get('email').value,
            this.registrationForm.get('password').get('first').value).subscribe({
            next: () => this.router.navigate(['/admin', httpResponse.body.webs[0].id]),
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
