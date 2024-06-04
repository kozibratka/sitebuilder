import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../abstract-class/abstract-admin-setting";
import {BasePlugConfigInterface} from "../../interfaces/base-plug-config-interface";
import {FormService} from "../../../core/services/form.service";

@Component({
  selector: 'app-plugin-dimension-admin',
  templateUrl: './plugin-dimension-admin.component.html',
  styleUrls: ['./plugin-dimension-admin.component.css']
})
export class PluginDimensionAdminComponent extends AbstractAdminSetting<BasePlugConfigInterface> {


  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }

  createAdminForm(settings: BasePlugConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        horizontalMargin: [15],
        paddingTop: [0],
        paddingBottom: [15],
      },
      settings
    );
  }
}
