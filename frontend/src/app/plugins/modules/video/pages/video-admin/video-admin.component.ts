import { Component } from '@angular/core';
import {VideoConfigInterface} from '../../interfaces/video-config-interface';
import {AbstractAdminSetting} from '../../../../abstract-class/abstract-admin-setting';
import {FormService} from "../../../../../core/services/form.service";

@Component({
  selector: 'app-image-v1-admin',
  templateUrl: 'video-admin.component.html',
  styleUrls: ['video-admin.component.css']
})
export class VideoAdminComponent extends AbstractAdminSetting<VideoConfigInterface> {
  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }
  createAdminForm(settings: VideoConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        videoPath: [''],
      },
      settings
    );
  }
}
