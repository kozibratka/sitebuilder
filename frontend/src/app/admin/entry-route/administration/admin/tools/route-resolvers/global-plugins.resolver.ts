import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {SymfonyApiClientService} from '../../../../../../core/services/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../core/services/http-response-toaster.service';
import {WebDetailResolverService} from '../../../tools/route-resolvers/web-detail-resolver.service';
import {BasePluginInterface} from '../interfaces/base-plugin-interface';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalPluginsResolver implements Resolve<Map<string, BasePluginInterface[]>> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, BasePluginInterface[]>> {
    const selectedWeb = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<BasePluginInterface[]>('plugin_global_list', [selectedWeb])
      .pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return this.sortGlobalPlugins(httpResponse.body);
      }));
  }

  sortGlobalPlugins(globalPlugins: BasePluginInterface[]): Map<string, BasePluginInterface[]> {
    const sortedBasePluginInterface = new Map<string, BasePluginInterface[]>();
    for (const plugin of globalPlugins) {
      if (!sortedBasePluginInterface.has(plugin.identifier)) {
        sortedBasePluginInterface.set(plugin.identifier, new Array<BasePluginInterface>());
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
