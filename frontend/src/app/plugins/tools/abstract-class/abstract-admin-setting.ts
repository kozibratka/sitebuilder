import {AbstractPlugin} from './abstract-plugin';
import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Directive} from '@angular/core';
import {AdminFormService} from '../forms/admin-form.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';

@Directive()
export abstract class AbstractAdminSetting<T extends BasePlugConfigInterface>{
  plugin: AbstractPlugin<T>;
  private _settings: T;
  webId: number;
  menuResolver: AbstractPluginResolver;
  adminForm: FormGroup;


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
