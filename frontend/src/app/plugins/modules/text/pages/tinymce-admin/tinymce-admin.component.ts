import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../../abstract-class/abstract-admin-setting";
import {TextConfigInterface} from "../../interfaces/text-config-interface";
import {FormBuilder} from "@angular/forms";
import {AdminFormService} from "../../../../forms/admin-form.service";

@Component({
  selector: 'app-tinymce-admin',
  templateUrl: './tinymce-admin.component.html',
  styleUrls: ['./tinymce-admin.component.css']
})
export class TinymceAdminComponent extends AbstractAdminSetting<TextConfigInterface> {

  constructor(
    protected fb: FormBuilder,
    protected adminFormService: AdminFormService
  ) {
    super();
  }
  createAdminForm(settings: TextConfigInterface) {
    this.adminForm = this.adminFormService.createForm(
      {
        text: ['']
      },
      settings
    );
  }
}
