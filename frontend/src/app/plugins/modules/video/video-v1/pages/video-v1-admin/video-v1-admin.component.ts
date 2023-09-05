import { Component } from '@angular/core';
import {AbstractAdminSetting} from '../../../../../abstract-class/abstract-admin-setting';
import {VideoV1ConfigInterface} from '../../interfaces/video-v1-config-interface';
import {AdminFormService} from '../../../../../forms/admin-form.service';

@Component({
  selector: 'app-image-v1-admin',
  templateUrl: './video-v1-admin.component.html',
  styleUrls: ['./video-v1-admin.component.css']
})
export class VideoV1AdminComponent extends AbstractAdminSetting<VideoV1ConfigInterface> {
  constructor(
    protected adminFormService: AdminFormService,
  ) {
    super();
  }
  createAdminForm(settings: VideoV1ConfigInterface): void {
    this.adminForm = this.adminFormService.createForm(
      {
        videoPath: [''],
      },
      settings
    );
  }
}
