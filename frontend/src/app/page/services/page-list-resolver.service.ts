import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PageInterface} from '../interfaces/page-interface';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {WebDetailResolverService} from '../../web/services/web-detail-resolver.service';
import {HttpResponseToasterService} from '../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';

@Injectable({
  providedIn: 'root'
})
export class PageListResolverService implements Resolve<PageInterface[]> {
  pages: PageInterface[] = [];

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageInterface[]> {
    return this.getPageList();
  }

  getPageList() {
    const webId = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<PageInterface[]>('page_list', {id: webId}).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      this.pages = httpResponse.body;
      return httpResponse.body;
    }));
  }

  getPageDetail(pageId) {
    return this.pages.find(value => value.id == pageId);
  }
}
