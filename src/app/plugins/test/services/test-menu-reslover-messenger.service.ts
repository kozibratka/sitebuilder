import { Injectable } from '@angular/core';
import {AbstractMenuPluginResolverMessenger} from '../../../admin/page-builder/page-builder/menu-builder/services/menu-plugin-resolvers/abstract-class/abstract-menu-plugin-resolver-messenger';
import {TestComponent} from '../test.component';

@Injectable({
  providedIn: 'root'
})
export class TestMenuResloverMessengerService extends AbstractMenuPluginResolverMessenger{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TestComponent;
  }

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=2';
  }

  get menuImageGridSize(): number {
    return 2;
  }

  get menuImageSize(): { x: number; y: number } {
    return {x: 2, y: 2};
  }

}
