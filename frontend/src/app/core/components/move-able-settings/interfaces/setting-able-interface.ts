import {Type} from '@angular/core';
import {SettingSubjectAbleInterface} from './setting-subject-able-interface';

export interface SettingAbleInterface<T> {
  getGlobalSettings(): {name: string, settings: T}[];
  setFromGlobalSettings(settings: T);
}
