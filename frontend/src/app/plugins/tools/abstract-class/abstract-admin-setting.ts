import {SettingSubjectAbleInterface} from '../../../core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {AbstractPlugin} from './abstract-plugin';

export class AbstractAdminSetting<T> implements SettingSubjectAbleInterface{
  subject: AbstractPlugin<T>;
  settings: T;

  setSubject(instance: AbstractPlugin<T>) {
    this.subject = instance;
    this.settings = instance.settings;
  }
}
