import {Component, OnInit} from '@angular/core';
import {RegisterFormService} from '../../services/register-form.service';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {LoginClientService} from '../../services/login-client.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {ApiFormService} from "../../../core/services/form/api-form.service";
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {NgIf} from "@angular/common";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  imports: [
    ReactiveFormsModule,
    InputFormErrorDirective,
    NgIf,
    RouterLink,
    GoogleSigninButtonModule
  ],
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
    this.registrationForm = this.registerTypeService.createForm({path: 'login_registration'});
    this.registrationForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('login_registration', this.registrationForm).subscribe(httpResponse => {
          // this.activationSend = true;
          this.loginClientService.tryLogin(this.registrationForm.get('email')?.value,
            this.registrationForm.get('password')?.get('first')?.value).subscribe({
            next: () => this.router.navigate(['/']),
          });
        });
      }
      else if (status === 'INVALID') {
        this.registrationForm.get('password')?.get('first')?.reset(
          this.registrationForm.get('password')?.get('first')?.value, {onlySelf: true, emitEvent: false}
          );
      }
    });
  }

  ngOnInit(): void {
  }
}
