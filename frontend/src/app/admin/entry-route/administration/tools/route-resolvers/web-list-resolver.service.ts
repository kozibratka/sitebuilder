import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';
import {SymfonyApiClientService} from '../../../../../core/services/symfony-api/symfony-api-client.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseToasterService} from '../../../../../core/services/http-response-toaster.service';
import {WebDetailResolverService} from './web-detail-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class WebListResolverService implements Resolve<WebInterface[]> {

  webList: WebInterface[];

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WebInterface[]> {
    return this.symfonyApiClientService.get<WebInterface[]>('web_list').pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      this.webList = httpResponse.body;
      if (this.webList.length) {
        this.webDetailResolverService.selectedId = this.webList[0].id;
      }
      return httpResponse.body;
    }));
  }
}
