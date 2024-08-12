import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {NgIf} from "@angular/common";
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {ForgotPasswordFormService} from "../../services/form/forgot-password-form.service";
import {ApiFormService} from "../../../core/services/form/api-form.service";
import {Router, RouterLink} from "@angular/router";
import {NotifierService} from "../../../core/services/notifier.service";

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [
    FormsModule,
    GoogleSigninButtonModule,
    NgIf,
    ReactiveFormsModule,
    InputFormErrorDirective,
    RouterLink
  ],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.css'
})
export class PasswordForgottenComponent {
  forgotPasswordForm: FormGroup;
  linkSend = false;

  constructor(
    forgotPasswordFormService: ForgotPasswordFormService,
    private router: Router,
    private notifierService: NotifierService,
    private apiFormService: ApiFormService
  ) {
    this.forgotPasswordForm = forgotPasswordFormService.createForm();
  }

  onSubmit() {
    this.apiFormService.send('login_link_reset_password', this.forgotPasswordForm).subscribe(value => {
      this.linkSend = true;
    });
  }
}
