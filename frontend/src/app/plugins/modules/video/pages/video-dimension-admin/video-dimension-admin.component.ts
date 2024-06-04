import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../../abstract-class/abstract-admin-setting";
import {VideoConfigInterface} from "../../interfaces/video-config-interface";
import {AdminFormService} from "../../../../forms/admin-form.service";
import {FormService} from "../../../../../core/services/form.service";

@Component({
  selector: 'app-video-dimension-admin',
  templateUrl: './video-dimension-admin.component.html',
  styleUrls: ['./video-dimension-admin.component.css']
})
export class VideoDimensionAdminComponent extends AbstractAdminSetting<VideoConfigInterface> {
  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }
  createAdminForm(settings: VideoConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        height: [''],
      },
      settings
    );
  }
}
