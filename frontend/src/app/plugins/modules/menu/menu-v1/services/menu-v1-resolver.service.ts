import { Injectable } from '@angular/core';
import {MenuV1Component} from '../components/menu-v1/menu-v1.component';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {MenuV1AdminComponent} from '../pages/menu-v1-admin/menu-v1-admin.component';

@Injectable({
  providedIn: 'root'
})
export class MenuV1ResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Menu',
      component: MenuV1AdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return MenuV1Component;
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
