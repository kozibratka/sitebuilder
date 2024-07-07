import { Component } from '@angular/core';
import {VideoConfigInterface} from '../../interfaces/video-config-interface';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FormService} from "../../../../core/services/form.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-image-v1-admin',
  standalone: true,
  templateUrl: 'video-admin.component.html',
  imports: [
    ReactiveFormsModule
  ],
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
