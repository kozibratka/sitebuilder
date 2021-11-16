import {Type} from '@angular/core';
import {SettingSubjectAbleInterface} from './setting-subject-able-interface';

export interface SettingAbleInterface<T> {
  getSettingItems(): {menuImage?: string, label: string, path: string, component: Type<SettingSubjectAbleInterface>}[];
  getGlobalSettings(): {name: string, settings: T}[];
  setFromGlobalSettings(settings: T);
}
