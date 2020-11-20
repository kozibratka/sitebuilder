import {Component, OnInit} from '@angular/core';
import {LoginFormService} from './tools/forms/login-form.service';
import {FormGroup} from '@angular/forms';
import {LoginClientService} from '../../../../core/services/login-client/login-client.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpResponseToasterService} from '../../../../core/services/http-response-toaster.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginFormService: LoginFormService,
    private loginClientService: LoginClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private router: Router
  ) {
    this.loginForm = this.loginFormService.createForm();
    this.loginForm.statusChanges.subscribe(state => {
      if (state === 'VALID') {
        this.loginClientService.tryLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe({
          next: httpResponse => {
            this.router.navigate(['/admin']);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.httpResponseToasterService.showError('Nepodařilo se přihlásit. Ujistěte se, že jste zadali správné přihlašovací údaje.');
            }
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
