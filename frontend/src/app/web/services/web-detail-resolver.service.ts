import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';

@Injectable({
  providedIn: 'root'
})
export class WebDetailResolverService implements Resolve<WebInterface> {

  selectedId = 0;
  webDetail: WebInterface = {plugins: [], id: 0, name: '', pages: []}; // persist reference

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) { }

  resolve(route: ActivatedRouteSnapshot = null, state: RouterStateSnapshot = null): Observable<WebInterface> {
    if (route && route.paramMap.has('webId')) {
      this.selectedId = parseInt(route.paramMap.get('webId'), null);
    }
    if (!this.selectedId) {
      return null;
    }
    return this.symfonyApiClientService.get<WebInterface>('web_read', {id: this.selectedId}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      this.webDetail.name = httpResponse.body.name;
      this.webDetail.id = httpResponse.body.id;
      this.webDetail.plugins.length = 0;
      this.webDetail.plugins.push(...this.webDetail.plugins);
      this.webDetail.pages = httpResponse.body.pages;
      return this.webDetail;
    }));
  }

  refresh() {
    this.resolve().subscribe();
  }
}
