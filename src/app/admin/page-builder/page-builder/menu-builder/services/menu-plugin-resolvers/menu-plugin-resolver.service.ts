import {Injectable, Input, Optional} from '@angular/core';
import {AbstractMenuPluginResolverMessenger} from './abstract-class/abstract-menu-plugin-resolver-messenger';

@Injectable()
export class MenuPluginResolverService {

  @Input() @Optional() private _abstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger[];
  private _selectedAbstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger;

  constructor() { }


  get abstractMenuPluginResolverMessenger(): AbstractMenuPluginResolverMessenger[] {
    return this._abstractMenuPluginResolverMessenger;
  }

  set abstractMenuPluginResolverMessenger(value: AbstractMenuPluginResolverMessenger[]) {
    this._abstractMenuPluginResolverMessenger = value;
  }

  get selectedAbstractMenuPluginResolverMessenger(): AbstractMenuPluginResolverMessenger {
    return this._selectedAbstractMenuPluginResolverMessenger;
  }

  set selectedAbstractMenuPluginResolverMessenger(value: AbstractMenuPluginResolverMessenger) {
    this._selectedAbstractMenuPluginResolverMessenger = value;
  }
}
