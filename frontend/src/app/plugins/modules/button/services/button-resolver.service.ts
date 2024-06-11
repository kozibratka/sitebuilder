import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {ButtonConfigInterface} from "../interfaces/button-config-interface";
import {ButtonAdminComponent} from "../pages/button-admin/button-admin.component";
import {ButtonComponent} from "../components/button/button.component";
import {ButtonLinkAdminComponent} from "../pages/button-link-admin/button-link-admin.component";

@Injectable({
  providedIn: 'root'
})
export class ButtonResolverService extends AbstractPluginResolver<ButtonConfigInterface> {

  adminComponentsClass = [
    {
      label: 'Tlačítko',
      component: ButtonAdminComponent,
      path: ''
    },
    {
      label: 'Odkaz',
      component: ButtonLinkAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return ButtonComponent;
  }

  get description(): string {
    return 'Tlačítko';
  }

  getMenuImage(): string {
    return 'select_all';
  }

  gridHeight(): number {
    return 13;
  }

  gridWidth(): number {
    return 26;
  }

  get identifier(): string {
    return PluginIdentifier.BUTTON_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Tlačítko';
  }

  getEmptySettings(): ButtonConfigInterface {
    return {
      identifier: PluginIdentifier.BUTTON_V1,
      externalUrl: null,
      pageUrl: null,
      label: 'Tlačítko',
      pageId: null,
      linkType: null,
      position: 'center',
      type: 'btn-primary',
    };
  }
}
