import {AbstractPlugin} from './abstract-plugin';
import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';
import {FormBuilder} from '@angular/forms';
import {Directive} from '@angular/core';
import {
  AbstractPluginResolver
} from '../../../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';
import {AdminFormService} from '../forms/admin-form.service';

@Directive()
export abstract class AbstractAdminSetting<T extends BasePlugConfigInterface>{
  subject: AbstractPlugin<T>;
  private _settings: T;
  webId: number;
  menuResolver: AbstractPluginResolver;


  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
  }

  abstract createAdminForm(settings: T): void;

  get settings(): T {
    return this._settings;
  }

  set settings(value: T) {
    this._settings = value;
    this.createAdminForm(this._settings);
  }
}
