import { Injectable } from '@angular/core';
import {TextAdminComponent} from '../pages/admin/text-admin.component';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextV1Component} from '../components/text-v1/text-v1.component';
import {PluginIdentifier} from '../../../tools/constants/plugin-identifier';

@Injectable({
  providedIn: 'root'
})
export class TextV1ResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TextV1Component;
  }

  adminComponentsClass = [
    {
      label: 'Text',
      component: TextAdminComponent,
      path: ''
    }
  ];

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=5';
  }

  get identifier(): string {
    return PluginIdentifier.TEXT_V1;
  }

  get description(): string {
    return 'Tvorba článku, který můžete umístit kamkoliv na vaše stránky.';
  }

  get name(): string {
    return 'Článek';
  }

  isAutoResizeHeight(): boolean {
    return true;
  }

  gridWidth(): number {
    return 5;
  }

  gridHeight(): number {
    return 5;
  }
}
