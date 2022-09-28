import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {TextPluginSettingsInterface} from '../../tools/interfaces/text-plugin-settings-interface';
import {SymfonyApiClientService} from '../../../../shared/core/services/api/symfony-api/symfony-api-client.service';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends AbstractAdminSetting<TextPluginSettingsInterface> implements OnInit{

  adminForm: FormGroup;

  ngOnInit(): void {
    this.adminForm = this.createForm();
    this.adminForm.patchValue({
      a: '1',
      b: '2'
    });
  }

  submit(): void {
  }

}
