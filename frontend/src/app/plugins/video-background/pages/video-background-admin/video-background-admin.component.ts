import { Component } from '@angular/core';
import {AbstractAdminSetting} from "../../../shared/abstract-class/abstract-admin-setting";
import {VideoBackgroundConfigInterface} from "../../interfaces/video-background-config-interface";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormService} from "../../../../core/services/form.service";
import {VideoConfigInterface} from "../../../video/interfaces/video-config-interface";
import {ImageInputComponent} from "../../../shared/components/inputs/image-inputs/image-input/image-input.component";
import {VideoBackgroundComponent} from "../../components/video-background/video-background.component";
import {asyncScheduler} from "rxjs";

@Component({
  selector: 'app-video-background-admin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ImageInputComponent
  ],
  templateUrl: './video-background-admin.component.html',
  styleUrl: './video-background-admin.component.css'
})
export class VideoBackgroundAdminComponent extends AbstractAdminSetting<VideoBackgroundConfigInterface, VideoBackgroundComponent> {
  form: FormGroup;
  constructor(
    protected adminFormService: FormService,
  ) {
    super();
  }
  createAdminForm(settings: VideoBackgroundConfigInterface): void {
    this.form = this.adminFormService.createForm(
      {
        videoPath: [''],
        height: [''],
        grayScale: [''],
        opacity: [''],
      },
      settings
    );
    this.form.get('videoPath').valueChanges.subscribe((value) => {
      asyncScheduler.schedule(() => this.contextObject.startVideo(true));
    });
  }
}
