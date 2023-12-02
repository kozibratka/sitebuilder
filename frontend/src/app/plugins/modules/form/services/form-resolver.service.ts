import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {FormAdminComponent} from '../pages/form-admin/form-admin.component';
import {FormComponent} from '../components/form/form.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {FormDataAdminComponent} from '../pages/form-data-admin/form-data-admin.component';
import {FormConfigInterface} from "../interfaces/form-config-interface";
import {TextInput} from "../../../../core/modules/form-builder/class/text-input";
import {Button} from "../../../../core/modules/form-builder/class/button";

@Injectable({
  providedIn: 'root'
})
export class FormResolverService extends AbstractPluginResolver<FormConfigInterface> {

  adminComponentsClass = [
    {
      label: 'Formulář',
      component: FormAdminComponent,
      path: ''
    },
    {
      label: 'Data formuláře',
      component: FormDataAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return FormComponent;
  }

  get description(): string {
    return 'Formulář';
  }

  getMenuImage(): string {
    return 'dynamic_form';
  }

  gridHeight(): number {
    return 15;
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
    return 'Formulář';
  }

  getEmptySettings(): FormConfigInterface {
    return {
      identifier: PluginIdentifier.FORM_V1,
      form: [[new TextInput(), new TextInput()], [new TextInput(), new TextInput()], [new Button()]],
    };
  }
}
