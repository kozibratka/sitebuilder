import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {WebDetailResolverService} from '../../../../web/services/web-detail-resolver.service';
import {catchError, map} from 'rxjs/operators';
import {HttpResponseToasterService} from '../../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../../core/services/api/symfony-api/symfony-api-client.service';
import {BasePlugConfigInterface} from '../../../../plugins/tools/interfaces/base-plug-config-interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalPluginsResolver implements Resolve<BasePlugConfigInterface[]> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BasePlugConfigInterface[]> {
    const selectedWeb = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<BasePlugConfigInterface[]>('plugin_global_list', {id: selectedWeb})
      .pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return httpResponse.body;
        // return this.sortGlobalPlugins(httpResponse.body);
      }));
  }

  sortGlobalPlugins(globalPlugins: BasePlugConfigInterface[]): Map<string, BasePlugConfigInterface[]> {
    const sortedBasePluginInterface = new Map<string, BasePlugConfigInterface[]>();
    for (const plugin of globalPlugins) {
      if (!sortedBasePluginInterface.has(plugin.identifier)) {
        sortedBasePluginInterface.set(plugin.identifier, new Array<BasePlugConfigInterface>());
      }
      sortedBasePluginInterface.get(plugin.identifier).push(plugin);
    }
    sortedBasePluginInterface.forEach((value, key, map1) => {
      value.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    });
    return sortedBasePluginInterface;
  }
}
