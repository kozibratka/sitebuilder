import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {VideoConfigInterface} from '../../interfaces/video-config-interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {DragStatusService} from "../../../../page/services/drag-status.service";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-video-v1',
  standalone: true,
  templateUrl: 'video.component.html',
  imports: [
    CommonModule,
    MatIcon
  ],
  styleUrls: ['video.component.css']
})
export class VideoComponent extends AbstractPlugin<VideoConfigInterface> implements AfterViewChecked, OnInit{

  sanitizedUrl: SafeResourceUrl;
  private lastVideoPath: string;
  disable = false;

  constructor(
    private sanitizer: DomSanitizer,
    public dragStatusService: DragStatusService,
  ) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
  }

  refreshView(): void {
  }

  getVideoUrl() {
    const videoUrl = this.validateYouTubeUrl(this.settings.videoPath);
    if (videoUrl && videoUrl !== this.lastVideoPath) {
      this.lastVideoPath = videoUrl;
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
    return this.sanitizedUrl;
  }

  validateYouTubeUrl(url: string)
  {
    if (url !== undefined || url !== '') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        // Do anything for being valid
        // if need to change the url to embed url then use below line
        return 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0';
      }
      else {
        return false;
      }
    }

    return false;
  }
}
