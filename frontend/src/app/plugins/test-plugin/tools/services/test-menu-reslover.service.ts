import { Injectable } from '@angular/core';
import {TestPluginComponent} from '../../test-plugin.component';
import {AbstractMenuPluginResolver} from '../../../../admin/entry-route/administration/admin/site-builder/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class TestMenuResloverService extends AbstractMenuPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TestPluginComponent;
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

  get identifier(): string {
    return 'test_plugin';
  }
}
