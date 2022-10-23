import {Inject, Injectable} from '@angular/core';
import {
  AbstractPluginResolver
} from '../../../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class PluginResolverService {

  constructor(
    @Inject(AbstractPluginResolver) private abstractMenuPluginResolvers: AbstractPluginResolver[],
  ) { }

  getPluginResolverByIdentifier(identifier: string) {
    return this.abstractMenuPluginResolvers.filter(value => value.identifier === identifier)[0];
  }
}
