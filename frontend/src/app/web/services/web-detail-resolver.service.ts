import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';
import {Helper} from "../../core/helpers/helper";

@Injectable({
  providedIn: 'root'
})
export class WebDetailResolverService implements Resolve<WebInterface> {

  selectedId = 0;
  webDetail: WebInterface = {plugins: [], id: 0, name: '', pages: []}; // persist reference
  resolver$:Observable<WebInterface>;

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
    this.resolver$ = this.symfonyApiClientService.get<WebInterface>('web_read', {id: this.selectedId}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      Helper.objectResetAssign(this.webDetail, httpResponse.body);
      this.webDetail.plugins.length = 0;
      this.webDetail.plugins.push(...this.webDetail.plugins);
      return this.webDetail;
    }));

    return this.resolver$;
  }

  refresh() {
    this.resolve().subscribe();
  }

  isTemplateWeb() {
    return !!!this.webDetail.parent;
  }
}
