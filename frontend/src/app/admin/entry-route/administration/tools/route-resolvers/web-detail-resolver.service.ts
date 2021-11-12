import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';
import {SymfonyApiClientService} from '../../../../../core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../core/services/http-response-toaster.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebDetailResolverService implements Resolve<WebInterface> {

  selectedId: number;
  webDetail: WebInterface = {plugins: [], id: 0, name: ''}; // persist reference

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) { }

  resolve(route: ActivatedRouteSnapshot = null, state: RouterStateSnapshot = null): Observable<WebInterface> {
    const webId = route && route.paramMap.get('webId') ? route.paramMap.get('webId') : this.selectedId;
    return this.symfonyApiClientService.get<WebInterface>('web_read', [webId]).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      this.webDetail.name = httpResponse.body.name;
      this.webDetail.id = httpResponse.body.id;
      this.webDetail.plugins.length = 0;
      this.webDetail.plugins.push(...this.webDetail.plugins);
      return this.webDetail;
    }));
  }

  refresh() {
    this.resolve().subscribe();
  }
}
