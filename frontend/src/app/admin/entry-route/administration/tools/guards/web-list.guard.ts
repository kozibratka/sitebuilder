import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {WebInterface} from '../interfaces/web-interface';
import {catchError, map} from 'rxjs/operators';
import {SymfonyApiClientService} from '../../../../../core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../core/services/http-response-toaster.service';
import {WebDetailResolverService} from '../route-resolvers/web-detail-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class WebListGuard implements CanActivate {

  webList: WebInterface[] = [];

  constructor(
    private router: Router,
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.firstChild && route.firstChild.url.length && route.firstChild.url[0].path === 'web') {
      return true;
    }

    return this.symfonyApiClientService.get<WebInterface[]>('web_list').pipe(
      map(value => {
        this.webList = value.body;
        if (this.webList.length) {
          this.webDetailResolverService.selectedId = this.webList[0].id;
          return true;
        } else {
          return this.router.parseUrl(route.url[0] + '/web/list');
        }
      }),
      catchError((error) => {
        this.httpResponseToasterService.showError(error);
        return throwError(error);
      }),
    );
  }
}
