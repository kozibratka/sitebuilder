import {Inject, Injectable} from '@angular/core';
import {AbstractPluginResolver} from './abstract-classes/abstract-plugin-resolver';

@Injectable()
export class MenuPluginResolverService {

  private _selectedAbstractPluginResolverMessenger: AbstractPluginResolver<any>;

  constructor(
    @Inject(AbstractPluginResolver) private _abstractMenuPluginResolver: AbstractPluginResolver<any>[]
  ) {

  }

  get selectedAbstractPluginResolverMessenger(): AbstractPluginResolver<any> {
    return this._selectedAbstractPluginResolverMessenger;
  }

  set selectedAbstractPluginResolverMessenger(value: AbstractPluginResolver<any>) {
    this._selectedAbstractPluginResolverMessenger = value;
  }

  get abstractMenuPluginResolver(): AbstractPluginResolver<any>[] {
    return this._abstractMenuPluginResolver;
  }
}
