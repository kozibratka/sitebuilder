import {Type} from '@angular/core';
import {SettingSubjectAbleInterface} from './setting-subject-able-interface';

export interface SettingAbleInterface {
  getSettingItems(): {menuImage?: string, label: string, path: string, component: Type<SettingSubjectAbleInterface>}[];
}
