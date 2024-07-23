import {Injectable} from '@angular/core';
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {Router} from "@angular/router";
import {HttpResponseToasterService} from "../../core/services/http-response-toaster.service";
import {Subscription} from "rxjs";

@Injectable()
export class SocialLoginService {
  subscription: Subscription;
  isLoggedIn = false;

  constructor(
    public authService: SocialAuthService,
    private symfonyApiClient: SymfonyApiClientService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
  ) {
  }

  prepareGoogleLogin() {
    if (this.subscription) {
      return;
    }
    this.subscription = this.authService.authState.subscribe((user) => {
      if (!user) {
        return;
      }
      this.isLoggedIn = true;
      this.symfonyApiClient.post<any>('login_social', {user, type: 'Google'}).subscribe({
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
    this.prepareGoogleLogin();
    buttonGoogle.click();
  }

  loginFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.isLoggedIn = true;
      this.symfonyApiClient.post<any>('login_social', {user, type: 'Facebook'}).subscribe({
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

  destroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.isLoggedIn) {
      this.authService.signOut();
    }
  }
}
