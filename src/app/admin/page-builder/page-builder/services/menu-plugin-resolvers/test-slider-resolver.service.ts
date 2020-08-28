import {Injectable} from '@angular/core';
import {AbstractMenuPluginResolver} from './abstract-menu-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class TestSliderResolverService extends AbstractMenuPluginResolver {

  constructor() {
    super();
  }

  getComponent(): new(...args: any[]) => any {
    return undefined;
  }

  getMenuImage(): string {
    return '';
  }
}
