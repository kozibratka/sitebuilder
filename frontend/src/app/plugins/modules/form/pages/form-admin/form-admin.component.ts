import { Component } from '@angular/core';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';

@Component({
  selector: 'app-form-v1-admin',
  templateUrl: 'form-admin.component.html',
  styleUrls: ['form-admin.component.css']
})
export class FormAdminComponent extends AbstractAdminSetting<FormConfigInterface>{
  createAdminForm(settings: FormConfigInterface): void {
  }
  refreshView() {
    this.contextObject.refreshView();
  }
}
