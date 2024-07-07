import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {VideoConfigInterface} from "../../interfaces/video-config-interface";
import {AdminFormService} from "../../../shared/forms/admin-form.service";
import {FormService} from "../../../../core/services/form.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-video-dimension-admin',
  standalone: true,
  templateUrl: './video-dimension-admin.component.html',
  imports: [
    ReactiveFormsModule
  ],
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
