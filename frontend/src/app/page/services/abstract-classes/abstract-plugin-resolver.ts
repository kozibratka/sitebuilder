import {Type} from '@angular/core';
import {AdminAbleInterface} from '../../../core/components/mini-admin/tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from '../../../core/components/mini-admin/tools/interfaces/setting-able-interface';
import {BasePlugConfigInterface} from "../../../plugins/interfaces/base-plug-config-interface";

export abstract class AbstractPluginResolver<T extends BasePlugConfigInterface> implements AdminAbleInterface{
  abstract adminComponentsClass: {menuIcon?: string, label: string, path: string, component: Type<SettingAbleInterface>}[];

  abstract getMenuImage(): string;

  abstract get componentClass(): new(...args: any[]) => {};

  abstract get identifier(): string;

  abstract get description(): string;

  abstract get name(): string;

  abstract isAutoResizeHeight(): boolean;

  abstract gridWidth(): number;

  abstract gridHeight(): number;

  abstract getEmptySettings(): T;
}
