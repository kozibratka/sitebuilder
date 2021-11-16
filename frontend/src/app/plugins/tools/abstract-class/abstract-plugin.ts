import {SettingAbleInterface} from '../../../shared/core/components/move-able-settings/tools/interfaces/setting-able-interface';
import {SettingSubjectAbleInterface} from '../../../shared/core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {Type} from '@angular/core';
import {BasePlugSettingsinInterface} from '../interfaces/base-plug-settingsin-interface';

export abstract class AbstractPlugin<T extends BasePlugSettingsinInterface> implements SettingAbleInterface<T>{
  settings: T;
  globalSettings: T[];

  abstract initEmptySettings(): void;

  abstract refreshView(): void;

  abstract getSettingItems(): { menuImage?: string; label: string; path: string; component: Type<SettingSubjectAbleInterface> }[];

  initializeSettings(settings: {}, isFromDatabase: boolean, globalSettings: T[]): void {
    this.settings = settings as T;
    if (!isFromDatabase) {
      this.initEmptySettings();
    }
    this.globalSettings = globalSettings;
  }

  getGlobalSettings(): { name: string; settings: T }[] {
    const filtered = this.globalSettings.filter(value => value.identifier === this.settings.identifier);
    return filtered.map((value) => ({name: value.name, settings: value}));
  }

  setFromGlobalSettings(settings: T) {
    this.settings = settings;
  }
}
