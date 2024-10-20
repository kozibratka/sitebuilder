import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from "../../../page/services/abstract-classes/abstract-plugin-resolver";
import {IconConfigInterface} from "../../icon/interfaces/icon-config-interface";
import {DelimiterConfigInterface} from "../interfaces/delimiter-config-interface";
import {IconComponent} from "../../icon/components/icon/icon.component";
import {IconAdminComponent} from "../../icon/pages/icon-admin/icon-admin.component";
import {LinkAdminComponent} from "../../shared/components/admin-pages/link-admin/link-admin.component";
import {PluginIdentifier} from "../../shared/constants/plugin-identifier";
import {DelimiterComponent} from "../components/delimiter/delimiter.component";
import {DelimiterAdminComponent} from "../pages/delimiter-admin/delimiter-admin.component";

@Injectable({
  providedIn: 'root'
})
export class DelimiterResolverService extends AbstractPluginResolver<DelimiterConfigInterface> {

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return DelimiterComponent;
  }

  adminComponentsClass = [
    {
      label: 'Oddělovač',
      component: DelimiterAdminComponent,
      path: ''
    },
  ];

  getMenuImage(): string {
    return 'horizontal_rule';
  }

  get identifier(): string {
    return PluginIdentifier.DELIMITER_V1;
  }

  get description(): string {
    return 'Oddělovač';
  }

  get name(): string {
    return 'Oddělovač';
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  gridWidth(): number {
    return 9;
  }

  gridHeight(): number {
    return 18;
  }

  getEmptySettings(): DelimiterConfigInterface {
    return {
      identifier: PluginIdentifier.DELIMITER_V1,
      type: 'v1',
      paddingTop: 15,
      paddingBottom: 15,
    };
  }
}
