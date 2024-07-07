import {Inject, Injectable} from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class PluginResolverService {

  constructor(
    @Inject(AbstractPluginResolver) private abstractMenuPluginResolvers: AbstractPluginResolver<any>[],
  ) { }

  getPluginResolverByIdentifier(identifier: string) {
    return this.abstractMenuPluginResolvers.filter(value => value.identifier === identifier)[0];
  }
}
