import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FormConfigInterface} from '../../interfaces/form-config-interface';
import {SymfonyApiClientService} from '../../../../core/services/api/symfony-api/symfony-api-client.service';
import {CommonModule} from "@angular/common";
import {FileService} from "../../../../core/services/file.service";

@Component({
  selector: 'app-form-data-admin',
  standalone: true,
  templateUrl: './form-data-admin.component.html',
  styleUrls: ['./form-data-admin.component.css'],
  imports: [
    CommonModule,
  ]
})
export class FormDataAdminComponent extends AbstractAdminSetting<FormConfigInterface> {
  formData;
  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private fileService: FileService
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

  downloadCsvData() {
    this.symfonyApiClientService.get<Blob>('plugin_form_data_csv', {hash: this.settings.hashId}, {}, {responseType: 'blob'}).subscribe(value => {
      var blob = new Blob([value.body]);
      this.fileService.blobToFile(blob, 'output.csv');
    });
  }
}
