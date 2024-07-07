import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LoginClientService} from '../../authorization/services/login-client.service';
import {NotifierService} from '../services/notifier.service';
import {SymfonyApiClientService} from '../services/api/symfony-api/symfony-api-client.service';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpResponseToasterService} from '../services/http-response-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class RouteRoleGuardService implements CanActivate {

  constructor(
    private loginClientService: LoginClientService,
    private notifierService: NotifierService,
    private router: Router,
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.loginClientService.isLoggedIn() === null) {
      this.notifierService.notify('Aktuálně nejste přihlášen. Znovu se prosím přihlaste', 'error');
      return this.router.parseUrl('/authorization/login');
    }

    if (this.loginClientService.isLoggedIn() === false) {
      this.notifierService.notify('Vaše přihlášení expirovalo. Znovu se prosím přihlaste', 'error');
      return this.router.parseUrl('/authorization/login');
    }

    return this.symfonyApiClientService.get<false | true>('role_check', {roleName: 'ROLE_USER'}).pipe(
      map(value => {
        if (value.body === true) {
          return true;
        }
        this.notifierService.notify('Nemáte dostatečné oprávnění k tomuto zdroji', 'error');
        return false;
      }),
      catchError((error) => {
        this.httpResponseToasterService.showError(error);
        return of(this.router.parseUrl('/authorization/login'));
      }),
    );

    // return new Observable(subscriber => {
    //   this.symfonyApiClientService.get<false | true>('role_check', ['ROLE_USER']).pipe(
    //     map(value => {
    //       if (value.body === true) {
    //         return true;
    //       }
    //       this.notifierService.notify('Nemáte dostatečné oprávnění k tomuto zdroji', 'error');
    //       return false;
    //     }),
    //     catchError((error) => {
    //       this.httpResponseToasterService.showError(error);
    //       return of(this.router.parseUrl('/authorization/login'));
    //     }),
    //   ).subscribe(value => {
    //     subscriber.next(value);
    //   });
    //
    //   return null;
    // });
  }


}
