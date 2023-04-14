import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MenuSimplePluginComponent} from '../menu-simple-plugin.component';
import {PluginIdentifier} from '../../tools/constants/plugin-identifier';
import {MenuAdminComponent} from '../pages/menu-admin/menu-admin.component';

@Injectable({
  providedIn: 'root'
})
export class MenuSimplePluginResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Menu',
      component: MenuAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return MenuSimplePluginComponent;
  }

  get description(): string {
    return 'Jednoduché menu';
  }

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=6';
  }

  gridHeight(): number {
    return 2;
  }

  gridWidth(): number {
    return 12;
  }

  get identifier(): string {
    return PluginIdentifier.SIMPLE_MENU;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Jednoduché menu';
  }
}
