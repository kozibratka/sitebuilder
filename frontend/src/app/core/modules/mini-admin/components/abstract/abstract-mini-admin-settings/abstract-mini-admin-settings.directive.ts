import {Component, Directive} from '@angular/core';
import {SettingAbleInterface} from "../../../interfaces/setting-able-interface";

@Directive()
export class AbstractMiniAdminSettings<T> implements SettingAbleInterface<T>{
  contextObject: {};
  settings: T;
}
