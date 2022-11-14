import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {PageInterface} from '../../page/interfaces/page-interface';
import {DomainInfoService} from '../../core/services/domain-info.service';
import {catchError, map} from 'rxjs/operators';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<PageInterface> {

  constructor(private domainInfoService: DomainInfoService,
              private symfonyApiClientService: SymfonyApiClientService,
              private httpResponseToasterService: HttpResponseToasterService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface> {
    const url = window.location.pathname;
    if (this.domainInfoService.isPreviewHostname()) {   // is preview
      return this.symfonyApiClientService.get<PageInterface>('page_get_preview', {url}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
    } else {  // is public
      return this.symfonyApiClientService.get<PageInterface>('page_get_public', {url}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
    }
  }
}
