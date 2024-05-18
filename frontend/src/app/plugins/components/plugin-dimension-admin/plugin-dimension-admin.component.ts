import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../abstract-class/abstract-admin-setting";
import {BasePlugConfigInterface} from "../../interfaces/base-plug-config-interface";
import {AdminFormService} from "../../forms/admin-form.service";

@Component({
  selector: 'app-plugin-dimension-admin',
  templateUrl: './plugin-dimension-admin.component.html',
  styleUrls: ['./plugin-dimension-admin.component.css']
})
export class PluginDimensionAdminComponent extends AbstractAdminSetting<BasePlugConfigInterface> {


  constructor(
    protected adminFormService: AdminFormService,
  ) {
    super();
  }

  createAdminForm(settings: BasePlugConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        horizontalMargin: [''],
      },
      settings
    );
  }
}
