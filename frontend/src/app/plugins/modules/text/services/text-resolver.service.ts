import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextComponent} from '../components/text/text.component';
import {TextTextAdminComponent} from '../pages/text-admin/text-text-admin.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';

@Injectable({
  providedIn: 'root'
})
export class TextResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TextComponent;
  }

  adminComponentsClass = [
    {
      label: 'Text',
      component: TextTextAdminComponent,
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
