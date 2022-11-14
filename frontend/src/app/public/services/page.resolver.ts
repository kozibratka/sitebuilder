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
    if (this.domainInfoService.isPreviewHostname()) {   // is preview
      const urlParams = new URLSearchParams(window.location.search);
      let pageId = null;
      if (urlParams.get('previewHash') && urlParams.get('pageId')) {
        localStorage.setItem('previewHash', urlParams.get('previewHash'));
        pageId = urlParams.get('pageId');
      }
      const previewHash = localStorage.getItem('previewHash');
      return this.symfonyApiClientService.get<PageInterface>('web_set_preview', {id: route.paramMap.get('pageId')}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
    } else {
      return this.symfonyApiClientService.get<PageInterface>('web_set_preview', {id: route.paramMap.get('pageId')}).pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));

    }
  }
}
