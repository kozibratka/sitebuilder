import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MenuAdminComponent} from '../pages/menu-admin/menu-admin.component';
import {MenuLogoAdminComponent} from '../pages/menu-logo-admin/menu-logo-admin.component';
import {MenuComponent} from '../components/menu/menu.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';

@Injectable({
  providedIn: 'root'
})
export class MenuResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Menu',
      component: MenuAdminComponent,
      path: ''
    },
    {
      label: 'Logo',
      component: MenuLogoAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return MenuComponent;
  }

  get description(): string {
    return 'Jednoduché menu';
  }

  getMenuImage(): string {
    return 'menu';
  }

  gridHeight(): number {
    return 6;
  }

  gridWidth(): number {
    return 12;
  }

  get identifier(): string {
    return PluginIdentifier.MENU_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Menu v1';
  }
}
