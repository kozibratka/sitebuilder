import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {TextPluginConfigInterface} from '../../tools/interfaces/text-plugin-config-interface';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends AbstractAdminSetting<TextPluginConfigInterface> implements OnInit{

  adminForm: FormGroup;

  ngOnInit(): void {
  }

  createAdminForm(settings: TextPluginConfigInterface) {
    this.adminForm = this.adminFormService.createForm(
      {
        text: ['']
      },
      settings
    );
    if (this.settings) {
      this.adminForm.patchValue(this.settings);
    }
  }

  submit(): void {
  }

}
