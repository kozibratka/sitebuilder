import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Resolve} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {WebInterface} from '../interfaces/web-interface';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';

@Injectable({
  providedIn: 'root'
})
export class WebListResolverGuard implements CanActivate, Resolve<any> {

  webList: WebInterface[] = [];
  isBlocked = false;

  constructor(
    private router: Router,
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const webId = parseInt(route.paramMap.get('webId'), null);
    return this.symfonyApiClientService.get<WebInterface[]>('web_list').pipe(
      map(value => {
        this.webList = value.body;
        if (route.firstChild && route.firstChild.url.length && route.firstChild.url[0].path === 'web') {
          return true;
        }
        if (!webId) {
          if (!this.webList.length) {
            return this.router.parseUrl('/admin/0/web/list');
          } else {
            return this.router.createUrlTree(['/admin', this.webList[0].id]);
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
        this.httpResponseToasterService.showError(error);
        return throwError(error);
      }),
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.webList;
  }
}
