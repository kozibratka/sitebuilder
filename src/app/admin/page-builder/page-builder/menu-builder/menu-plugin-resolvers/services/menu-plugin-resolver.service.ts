import {Inject, Injectable, Input, Optional} from '@angular/core';
import {AbstractMenuPluginResolverMessenger} from '../messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';

@Injectable()
export class MenuPluginResolverService {

  private _selectedAbstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger;

  constructor(
    @Inject(AbstractMenuPluginResolverMessenger) private _abstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger[]
  ) {

  }

  get selectedAbstractMenuPluginResolverMessenger(): AbstractMenuPluginResolverMessenger {
    return this._selectedAbstractMenuPluginResolverMessenger;
  }

  set selectedAbstractMenuPluginResolverMessenger(value: AbstractMenuPluginResolverMessenger) {
    this._selectedAbstractMenuPluginResolverMessenger = value;
  }

  get abstractMenuPluginResolverMessenger(): AbstractMenuPluginResolverMessenger[] {
    return this._abstractMenuPluginResolverMessenger;
  }
}
