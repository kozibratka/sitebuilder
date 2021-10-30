import {Component, OnInit} from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
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

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

  submit(): void {
  }

}
