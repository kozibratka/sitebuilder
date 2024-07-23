import { Injectable } from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {Router} from "@angular/router";
import {HttpResponseToasterService} from "../../core/services/http-response-toaster.service";

@Injectable()
export class SocialLoginService {

  constructor(
    private authService: SocialAuthService,
    private symfonyApiClient: SymfonyApiClientService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
  ) {
    this.prepareGoogleLogin();
  }

  prepareGoogleLogin() {
    this.authService.authState.subscribe((user) => {
      this.symfonyApiClient.post<any>('login_google', {user}).subscribe({
          next: (value) => {
            this.symfonyApiClient.token = value.body.token;
            this.router.navigate(['/']);
          },
          error: err => {
            this.httpResponseToasterService.showError(err);
          }
        }
      );
    });
  }

  loginGoogle(button: HTMLElement) {
    let buttonGoogle = button.querySelector<HTMLElement>('[role="button"]');
    buttonGoogle.click();
  }
}
