import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {SymfonyApiClientService} from '../../../../../core/services/api/symfony-api/symfony-api-client.service';

@Component({
  selector: 'app-form-data-admin',
  templateUrl: './form-data-admin.component.html',
  styleUrls: ['./form-data-admin.component.css']
})
export class FormDataAdminComponent extends AbstractAdminSetting<FormConfigInterface> {
  formData;
  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
  ) {
    super();
  }

  createAdminForm(settings: FormConfigInterface): void {
    if (!this.settings.hashId) {
      return;
    }
    this.symfonyApiClientService.get('plugin_form_get_data', {hash: settings.hashId}).subscribe(value => {
      this.formData = value.body;
    });
  }

  toJson(data) {
    return JSON.stringify(data);
  }
}
