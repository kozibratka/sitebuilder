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

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private route: ActivatedRoute,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WebInterface> {
    return this.symfonyApiClientService.get<WebInterface>('web_read', [this.selectedId]).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      return httpResponse.body;
    }));
  }
}
