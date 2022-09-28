import {Inject, Injectable} from '@angular/core';
import {
  AbstractMenuPluginResolver
} from '../../../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class PluginResolverService {

  constructor(
    @Inject(AbstractMenuPluginResolver) private abstractMenuPluginResolvers: AbstractMenuPluginResolver[],
  ) { }

  getPluginResolverByIdentifier(identifier: string) {
    return this.abstractMenuPluginResolvers.filter(value => value.identifier === identifier)[0];
  }
}
