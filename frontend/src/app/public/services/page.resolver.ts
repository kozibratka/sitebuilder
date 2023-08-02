import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {PageInterface} from '../../page/interfaces/page-interface';
import {SystemInfoService} from '../../core/services/system-info.service';
import {catchError, map} from 'rxjs/operators';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<PageInterface> {

  constructor(private domainInfoService: SystemInfoService,
              private symfonyApiClientService: SymfonyApiClientService,
              private httpResponseToasterService: HttpResponseToasterService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface> {
    const url = window.location.pathname.substring(1);
    if (this.domainInfoService.isPreviewHostname()) {   // is preview
      const urlParams = new URLSearchParams(window.location.search);
      let webId = urlParams.get('webId');
      if (webId) {
        localStorage.setItem('webId', webId);
      }
      webId = localStorage.getItem('webId');
      return this.symfonyApiClientService.get<PageInterface>('page_get_preview', {id: webId, url}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
    } else {  // is public
      return this.symfonyApiClientService.get<PageInterface>('page_get_public', {hostname: location.hostname, url}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
    }
  }
}
