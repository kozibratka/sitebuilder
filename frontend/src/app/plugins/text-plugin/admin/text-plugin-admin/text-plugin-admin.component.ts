import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {TextPluginSettingsInterface} from '../../tools/interfaces/text-plugin-settings-interface';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends AbstractAdminSetting<TextPluginSettingsInterface> implements OnInit{

  adminForm: FormGroup;

  ngOnInit(): void {
  }

  createAdminForm(settings: TextPluginSettingsInterface) {
    this.adminForm = this.createForm(
      {
        text: ['']
      }
    );
    if (this.settings) {
      this.adminForm.patchValue(this.settings);
    }
  }

  submit(): void {
  }

}
