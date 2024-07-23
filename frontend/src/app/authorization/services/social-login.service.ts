import {Injectable} from '@angular/core';
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {Router} from "@angular/router";
import {HttpResponseToasterService} from "../../core/services/http-response-toaster.service";
import {Subscription} from "rxjs";

@Injectable()
export class SocialLoginService {
  subscription: Subscription;

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
    this.prepareGoogleLogin();
    buttonGoogle.click();
  }

  destroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.authService.signOut();
    }
  }
}
