import { Component } from '@angular/core';
import {ConfigInterface} from '../../interfaces/config-interface';
import {FormBuilder} from '@angular/forms';
import {AbstractAdminSetting} from '../../../../tools/abstract-class/abstract-admin-setting';
import {AdminFormService} from '../../../../tools/forms/admin-form.service';

@Component({
  selector: 'app-carousel-bootstrap-effect-admin',
  templateUrl: './effect-admin.component.html',
  styleUrls: ['./effect-admin.component.css']
})
export class EffectAdminComponent extends AbstractAdminSetting<ConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }

  createAdminForm(settings: ConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        intervalRotate: [''],
        autostart: ['']
      },
      settings
    );
  }

}
