import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {FormV1AdminComponent} from '../pages/form-v1-admin/form-v1-admin.component';
import {FormV1Component} from '../components/form-v1/form-v1.component';

@Injectable({
  providedIn: 'root'
})
export class FormV1ResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Formulář',
      component: FormV1AdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return FormV1Component;
  }

  get description(): string {
    return 'Formulář';
  }

  getMenuImage(): string {
    return 'dynamic_form';
  }

  gridHeight(): number {
    return 13;
  }

  gridWidth(): number {
    return 26;
  }

  get identifier(): string {
    return PluginIdentifier.FORM_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Formulář v1';
  }
}
