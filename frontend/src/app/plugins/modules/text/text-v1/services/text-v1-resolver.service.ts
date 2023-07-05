import { Injectable } from '@angular/core';
import {TextV1Component} from '../components/text-v1/text-v1.component';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {TextV1TextAdminComponent} from '../pages/text-v1-admin/text-v1-text-admin.component';

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
      component: TextV1TextAdminComponent,
      path: ''
    }
  ];

  getMenuImage(): string {
    return 'article';
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
