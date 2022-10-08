import {Type} from '@angular/core';
import {
  SettingSubjectAbleInterface
} from '../../../../../../../../../shared/core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {SettingAbleInterface} from '../../../../../../../../../shared/core/components/mini-admin/tools/interfaces/setting-able-interface';

export abstract class AbstractMenuPluginResolver implements SettingAbleInterface{
  abstract getMenuImage(): string;

  abstract get menuImageSize(): { x: number, y: number };

  abstract get componentClass(): new(...args: any[]) => {};

  abstract adminComponentsClass(): {menuIcon?: string, label: string, path: string, component: Type<SettingSubjectAbleInterface>}[];

  abstract get menuImageGridSize(): number;

  abstract get identifier(): string;

  abstract get description(): string;

  abstract get name(): string;
}
