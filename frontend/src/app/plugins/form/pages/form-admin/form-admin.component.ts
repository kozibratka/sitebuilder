import { Component } from '@angular/core';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {
  FormBuilderComponent
} from "../../../../core/modules/form-builder/components/form-admin/form-builder/form-builder.component";

@Component({
  selector: 'app-form-v1-admin',
  standalone: true,
  templateUrl: 'form-admin.component.html',
  imports: [
    FormBuilderComponent
  ],
  styleUrls: ['form-admin.component.css']
})
export class FormAdminComponent extends AbstractAdminSetting<FormConfigInterface>{
  createAdminForm(settings: FormConfigInterface): void {
  }
  refreshView() {
    this.contextObject.refreshView();
  }
}
