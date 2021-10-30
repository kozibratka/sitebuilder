import {SettingAbleInterface} from '../../../core/components/move-able-settings/tools/interfaces/setting-able-interface';
import {SettingSubjectAbleInterface} from '../../../core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {Type} from '@angular/core';

export abstract class AbstractPlugin<T> implements SettingAbleInterface{
  settings: T;

  abstract initEmptySettings(): void;

  abstract refreshView(): void;

  abstract getSettingItems(): { menuImage?: string; label: string; path: string; component: Type<SettingSubjectAbleInterface> }[];

  initializeSettings(settings: {}, isFromDatabase: boolean): void {
    this.settings = settings as T;
    if (!isFromDatabase) {
      this.initEmptySettings();
    }
  }
}
