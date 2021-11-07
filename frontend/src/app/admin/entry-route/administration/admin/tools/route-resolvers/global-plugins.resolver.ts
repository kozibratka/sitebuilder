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
import {BasePlugSettingsinInterface} from '../../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalPluginsResolver implements Resolve<Map<string, BasePlugSettingsinInterface[]>> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, BasePlugSettingsinInterface[]>> {
    const selectedWeb = this.webDetailResolverService.selectedId;
    return this.symfonyApiClientService.get<BasePlugSettingsinInterface[]>('plugin_global_list', [selectedWeb])
      .pipe(catchError(err => {
        this.httpResponseToasterService.showError(err);
        return throwError(err);
      }), map(httpResponse => {
        return this.sortGlobalPlugins(httpResponse.body);
      }));
  }

  sortGlobalPlugins(globalPlugins: BasePlugSettingsinInterface[]): Map<string, BasePlugSettingsinInterface[]> {
    const sortedBasePluginInterface = new Map<string, BasePlugSettingsinInterface[]>();
    for (const plugin of globalPlugins) {
      if (!sortedBasePluginInterface.has(plugin.identifier)) {
        sortedBasePluginInterface.set(plugin.identifier, new Array<BasePlugSettingsinInterface>());
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
