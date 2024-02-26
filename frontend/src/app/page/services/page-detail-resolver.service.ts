import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageInterface} from '../interfaces/page-interface';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';

@Injectable({
  providedIn: 'root'
})
export class PageDetailResolverService implements Resolve<PageInterface> {

  page: PageInterface;
  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface> {
    return this.symfonyApiClientService.get<PageInterface>('page_read', {id: route.paramMap.get('pageId')}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      this.page = httpResponse.body;
      return this.page;
    }));
  }
}
