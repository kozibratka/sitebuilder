import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Resolve} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {WebInterface} from '../interfaces/web-interface';
import {catchError, map} from 'rxjs/operators';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';
import {Helper} from "../../core/helpers/helper";
import {LoginClientService} from "../../authorization/services/login-client.service";

@Injectable({
  providedIn: 'root'
})
export class WebListResolverGuard implements CanActivate, Resolve<any> {

  webList: WebInterface[] = [];
  isBlocked = false;

  constructor(
    private router: Router,
    private symfonyApiClientService: SymfonyApiClientService,
    private loginClient: LoginClientService,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loginClient.isLoggedIn()) {
      return this.router.parseUrl('/authorization/login');
    }
    if (state.url.includes('/admin/0/web/select-template') || state.url.includes('/admin/0/web/create-name/0')) {
      return true;
    }
    const webId = parseInt(route.paramMap.get('webId'), null);
    if (!webId) {
      return this.refreshWebList();
    }

    return true;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const webId = parseInt(route.paramMap.get('webId'), null);
    return this.refreshWebList(webId);
  }

  refreshWebList(webId: number = 0) {
    return this.symfonyApiClientService.get<WebInterface[]>('web_list').pipe(
      map(value => {
        Helper.objectResetAssign(this.webList, value.body);
        // if (route.firstChild && route.firstChild.url.length && route.firstChild.url[0].path === 'web') {
        //   return true;
        // }
        if (!webId || !this.webList.length) {
          if (!this.webList.length) {
            this.router.navigate(['/admin/0/web/select-template']);
          } else {
            let webId = this.webList[0].id;
            let lastWebSwitched = parseInt(localStorage.getItem('web'));
            if (lastWebSwitched) {
              webId = this.webList.find(value1 => value1.id == lastWebSwitched)?.id ?? webId;
            }
            return this.router.createUrlTree(['/admin', webId]);
          }
        }
        if (this.webList.length) {
          this.isBlocked = false;
          return true;
        } else {
          this.isBlocked = true;
          return this.router.parseUrl('/admin/0/web/list');
        }
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
