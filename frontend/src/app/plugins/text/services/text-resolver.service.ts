import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {TextComponent} from '../components/text/text.component';
import {PluginIdentifier} from '../../shared/constants/plugin-identifier';
import {TinymceAdminComponent} from "../pages/tinymce-admin/tinymce-admin.component";
import {TextConfigInterface} from "../interfaces/text-config-interface";

@Injectable({
  providedIn: 'root'
})
export class TextResolverService extends AbstractPluginResolver<TextConfigInterface>{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TextComponent;
  }

  adminComponentsClass = [
    {
      label: 'Text',
      component: TinymceAdminComponent,
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

  getEmptySettings(): TextConfigInterface {
    return {
      identifier: 'text_v1',
      text: 'Text plugin'
    };
  }
}
