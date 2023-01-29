import {Type} from '@angular/core';
import {AdminAbleInterface} from '../../../core/components/mini-admin/tools/interfaces/admin-able-interface';
import {SettingAbleInterface} from '../../../core/components/mini-admin/tools/interfaces/setting-able-interface';

export abstract class AbstractPluginResolver implements AdminAbleInterface{
  abstract getMenuImage(): string;

  abstract get menuImageSize(): { x: number, y: number };

  abstract get componentClass(): new(...args: any[]) => {};

  abstract adminComponentsClass(): {menuIcon?: string, label: string, path: string, component: Type<SettingAbleInterface>}[];

  abstract get menuImageGridSize(): number;

  abstract get identifier(): string;

  abstract get description(): string;

  abstract get name(): string;

  abstract isAutoResizeHeight(): boolean;

  abstract gridWidth(): number;

  abstract gridHeight(): number;
}
