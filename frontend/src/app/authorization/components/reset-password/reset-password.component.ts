import { Component } from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputFormErrorDirective} from "../../../core/directives/form-error/input-form-error/input-form-error.directive";
import {ForgotPasswordFormService} from "../../services/form/forgot-password-form.service";
import {Router} from "@angular/router";
import {NotifierService} from "../../../core/services/notifier.service";
import {ResetPasswordFormService} from "../../services/form/reset-password-form.service";
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Component({
  selector: 'app-reset-password',
  standalone: true,
    imports: [
        FormsModule,
        InputFormErrorDirective,
        ReactiveFormsModule
    ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  constructor(
    resetPasswordFormService: ResetPasswordFormService,
    private router: Router,
    private notifierService: NotifierService,
    private apiFormService: ApiFormService,
  ) {
    this.resetPasswordForm = resetPasswordFormService.createForm();
  }

  onSubmit() {
    this.apiFormService.send('', this.resetPasswordForm).subscribe(value => {
      this.notifierService.success('Bylo nastavené nové heslo, nyní se můžete přihlásit')
      this.router.navigate(['authorization', 'login', 0]);
    });
  }
}
