import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {SymfonyApiClientService} from '../../../../../../../../../../core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../../../../../core/services/http-response-toaster.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageBlockInterface} from '../interfaces/page-block-interface';

@Injectable({
  providedIn: 'root'
})
export class PaletteBlockResolverService implements Resolve<PageBlockInterface[]>{

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageBlockInterface[]> {
    return this.symfonyApiClientService.get<PageBlockInterface[]>('page_read', [route.paramMap.get('pageId')]).pipe(catchError(err => {
      this.httpResponseToasterService.showError(err);
      return throwError(err);
    }), map(httpResponse => {
      return httpResponse.body;
    }));
  }
}
