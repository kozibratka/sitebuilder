import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MenuV1Component} from '../components/menu-v1/menu-v1.component';
import {PluginIdentifier} from '../../../tools/constants/plugin-identifier';

@Injectable({
  providedIn: 'root'
})
export class MenuV1ResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Menu',
      component: MenuV1Component,
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
    return 'https://via.placeholder.com/300/000000?text=6';
  }

  gridHeight(): number {
    return 2;
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
    return 'Jednoduché menu';
  }
}
