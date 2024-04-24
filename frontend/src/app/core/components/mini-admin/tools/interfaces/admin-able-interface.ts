import {Type} from '@angular/core';
import {SettingAbleInterface} from './setting-able-interface';

export interface AdminAbleInterface {
  adminComponentsClass: {menuIcon?: string, label: string, path?: string, component: Type<SettingAbleInterface>}[];
  // getGlobalSettings(): {name: string, settings: T}[];
  // setFromGlobalSettings(settings: T);
}
