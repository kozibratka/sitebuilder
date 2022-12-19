import { Injectable } from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
import {PluginIdentifier} from '../../../tools/constants/plugin-identifier';
import {TextPluginAdminComponent} from '../../admin/text-plugin-admin/text-plugin-admin.component';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';

@Injectable({
  providedIn: 'root'
})
export class TextPluginResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TextPluginComponent;
  }

  adminComponentsClass() {
    return [
      {
        label: 'Text',
        component: TextPluginAdminComponent,
        path: ''
      }
    ];
  }

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=5';
  }

  get menuImageGridSize(): number {
    return 2;
  }

  get menuImageSize(): { x: number; y: number } {
    return {x: 2, y: 2};
  }

  get identifier(): string {
    return PluginIdentifier.TEXT_PLUGIN;
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
}
