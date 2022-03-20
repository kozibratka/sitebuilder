import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ArticleInterface} from '../../../tools/interfaces/article-interface';
import {SymfonyApiClientService} from '../../../../../../../../shared/core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../../../shared/core/services/http-response-toaster.service';
import {WebDetailResolverService} from '../../../../../tools/route-resolvers/web-detail-resolver.service';
import {Observable, throwError} from 'rxjs';
import {PageInterface} from '../../../../page/tools/interfaces/page-interface';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleListResolverService implements Resolve<ArticleInterface[]>  {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleInterface[]> {
    const webId = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<ArticleInterface[]>('article_list', [webId]).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      return httpResponse.body;
    }));
  }
}
