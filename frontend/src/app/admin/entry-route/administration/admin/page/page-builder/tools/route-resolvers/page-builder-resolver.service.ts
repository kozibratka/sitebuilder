import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SymfonyApiClientService} from '../../../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../../../shared/core/services/http-response-toaster.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageInterface} from '../../../tools/interfaces/page-interface';

@Injectable({
  providedIn: 'root'
})
export class PageBuilderResolverService implements Resolve<PageInterface>{

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface> {
    return this.symfonyApiClientService.get<PageInterface>('page_read', {id: route.paramMap.get('pageId')}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      return httpResponse.body;
    }));
  }
}
