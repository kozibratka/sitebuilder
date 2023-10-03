import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {FormV1ConfigInterface} from '../../interfaces/form-v1-config-interface';

@Component({
  selector: 'app-form-v1-admin',
  templateUrl: './form-v1-admin.component.html',
  styleUrls: ['./form-v1-admin.component.css']
})
export class FormV1AdminComponent extends AbstractAdminSetting<FormV1ConfigInterface>{
  createAdminForm(settings: FormV1ConfigInterface): void {
  }
  refreshView() {
    this.contextObject.refreshView();
  }
}
