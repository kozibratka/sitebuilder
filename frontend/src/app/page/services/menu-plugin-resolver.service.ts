import {Inject, Injectable} from '@angular/core';
import {AbstractPluginResolver} from './abstract-classes/abstract-plugin-resolver';

@Injectable()
export class MenuPluginResolverService {

  private _selectedAbstractPluginResolverMessenger: AbstractPluginResolver;

  constructor(
    @Inject(AbstractPluginResolver) private _abstractMenuPluginResolver: AbstractPluginResolver[]
  ) {

  }

  get selectedAbstractPluginResolverMessenger(): AbstractPluginResolver {
    return this._selectedAbstractPluginResolverMessenger;
  }

  set selectedAbstractPluginResolverMessenger(value: AbstractPluginResolver) {
    this._selectedAbstractPluginResolverMessenger = value;
  }

  get abstractMenuPluginResolver(): AbstractPluginResolver[] {
    return this._abstractMenuPluginResolver;
  }
}
