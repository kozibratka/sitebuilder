import {SettingSubjectAbleInterface} from '../../../shared/core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {AbstractPlugin} from './abstract-plugin';
import {BasePlugSettingsinInterface} from '../interfaces/base-plug-settingsin-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Directive} from '@angular/core';
import {
  AbstractMenuPluginResolver
} from '../../../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {AdminFormService} from '../forms/admin-form.service';

@Directive()
export abstract class AbstractAdminSetting<T extends BasePlugSettingsinInterface> implements SettingSubjectAbleInterface{
  subject: AbstractPlugin<T>;
  settings: T;
  webId: number;
  menuResolver: AbstractMenuPluginResolver;


  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
  }

  abstract createAdminForm(settings: T): void;

  initForm(settings?: T) {
    this.settings = settings;
    this.createAdminForm(settings);
  }

  setSubject(instance: AbstractPlugin<T>) {
    this.subject = instance;
    this.settings = instance.settings;
  }
}
