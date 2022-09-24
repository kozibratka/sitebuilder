import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PageInterface} from '../../../tools/interfaces/page-interface';
import {SymfonyApiClientService} from '../../../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../../../shared/core/services/http-response-toaster.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {WebDetailResolverService} from '../../../../../tools/route-resolvers/web-detail-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class PageListResolverService implements Resolve<PageInterface[]> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface[]> {
    const webId = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<PageInterface[]>('page_list', {id: webId}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      return httpResponse.body;
    }));
  }
}
