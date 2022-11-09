import {Inject, Injectable, Input, Optional} from '@angular/core';
import {AbstractPluginResolver} from './abstract-classes/abstract-plugin-resolver';

@Injectable()
export class MenuPluginResolverService {

  private _selectedAbstractPluginResolverMessenger: AbstractPluginResolver;

  constructor(
    @Inject(AbstractPluginResolver) private _abstractMenuPluginResolverMessenger: AbstractPluginResolver[]
  ) {

  }

  get selectedAbstractPluginResolverMessenger(): AbstractPluginResolver {
    return this._selectedAbstractPluginResolverMessenger;
  }

  set selectedAbstractPluginResolverMessenger(value: AbstractPluginResolver) {
    this._selectedAbstractPluginResolverMessenger = value;
  }

  get abstractMenuPluginResolverMessenger(): AbstractPluginResolver[] {
    return this._abstractMenuPluginResolverMessenger;
  }
}
