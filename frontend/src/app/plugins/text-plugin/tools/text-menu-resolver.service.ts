import { Injectable } from '@angular/core';
import {AbstractMenuPluginResolver} from '../../../admin/entry-route/administration/admin/site-builder/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {TextPluginComponent} from '../text-plugin.component';

@Injectable({
  providedIn: 'root'
})
export class TextMenuResolverService extends AbstractMenuPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return TextPluginComponent;
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
    return 'text_plugin';
  }
}
