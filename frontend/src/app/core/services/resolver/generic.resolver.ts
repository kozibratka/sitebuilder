import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SymfonyApiClientService} from '../api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../http-response-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class GenericResolver implements Resolve<{}[]> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{}[]> {
    const config = route.data['resolverConfig'];
    const routeName = config.data.route;
    const queryMap = (config.queryDataMap  ?? {}) as {string: string};
    const quryParam = {};
    const pathFromRoot = route.pathFromRoot;
    for (const [key, value] of Object.entries(queryMap)) {
      quryParam[value] = this.getParameterFromUrl(key, pathFromRoot);
    }

    return this.symfonyApiClientService.get<{}[]>(routeName, quryParam)
      .pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
      }));
  }

  getParameterFromUrl(name: string, pathFromRoot: ActivatedRouteSnapshot[]) {
    for (const path of pathFromRoot.reverse()) {
      if (path.paramMap.has(name)) {
        return path.paramMap.get(name);
      }
    }

    return 'paramNotFound';
  }
}
