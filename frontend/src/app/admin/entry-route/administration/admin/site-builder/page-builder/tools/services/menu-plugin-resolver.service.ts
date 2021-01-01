import {Inject, Injectable, Input, Optional} from '@angular/core';
import {AbstractMenuPluginResolver} from '../messengers/abstract-classes/abstract-menu-plugin-resolver';

@Injectable()
export class MenuPluginResolverService {

  private _selectedAbstractMenuPluginResolverMessenger: AbstractMenuPluginResolver;

  constructor(
    @Inject(AbstractMenuPluginResolver) private _abstractMenuPluginResolverMessenger: AbstractMenuPluginResolver[]
  ) {

  }

  get selectedAbstractMenuPluginResolverMessenger(): AbstractMenuPluginResolver {
    return this._selectedAbstractMenuPluginResolverMessenger;
  }

  set selectedAbstractMenuPluginResolverMessenger(value: AbstractMenuPluginResolver) {
    this._selectedAbstractMenuPluginResolverMessenger = value;
  }

  get abstractMenuPluginResolverMessenger(): AbstractMenuPluginResolver[] {
    return this._abstractMenuPluginResolverMessenger;
  }
}
