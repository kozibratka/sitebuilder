import {AbstractPlugin} from './abstract-plugin';
import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';
import {FormGroup} from '@angular/forms';
import {Directive} from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';

@Directive()
export abstract class AbstractAdminSetting<T extends BasePlugConfigInterface>{
  contextObject: AbstractPlugin<T>;
  private _settings: T;
  webId: number;
  adminForm: FormGroup;


  constructor(
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
