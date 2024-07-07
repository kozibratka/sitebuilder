import {Component, OnInit} from '@angular/core';
import {LoginFormService} from '../../services/login-form.service';
import {AbstractControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginClientService} from '../../services/login-client.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private internal = 0;
  activated = 0;

  constructor(
    private loginFormService: LoginFormService,
    private loginClientService: LoginClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.loginFormService.createForm();
  }

  ngOnInit(): void {
    this.activated = parseInt(this.route.snapshot.paramMap.get('activated') ?? '0');
    if (this.loginClientService.isLoggedIn()) {
      this.router.navigate(['admin', 0]);
    }
  }

  onSubmit(): void {
    if (!this.loginForm.valid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginClientService.tryLogin(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
      next: httpResponse => {
        this.router.navigate(['/admin', 0]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.httpResponseToasterService.showError('Nepodařilo se přihlásit. Ujistěte se, že jste zadali správné přihlašovací údaje.');
        } else {
          this.httpResponseToasterService.showError(err);
        }
      }
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }
}
