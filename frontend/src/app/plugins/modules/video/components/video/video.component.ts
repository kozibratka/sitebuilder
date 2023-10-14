import {AfterViewChecked, Component} from '@angular/core';
import {VideoConfigInterface} from '../../interfaces/video-config-interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';

@Component({
  selector: 'app-video-v1',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent extends AbstractPlugin<VideoConfigInterface> implements AfterViewChecked{

  sanitizedUrl: SafeResourceUrl;
  private lastVideoPath: string;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngAfterViewChecked(): void {
  }

  initEmptySettings(): VideoConfigInterface {
    return {
      identifier: PluginIdentifier.VIDEO_V1,
      videoPath: 'https://www.youtube.com/embed?v=2Gg6Seob5Mg&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E&ab_channel=NOCOPYRIGHTMOTIONGRAPHICS',
    };
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): any {
    return {videoPath: ''};
  }

  getVideoUrl() {
    if (this.settings.videoPath !== this.lastVideoPath) {
      this.lastVideoPath = this.settings.videoPath;
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.settings.videoPath);
    }
    return this.sanitizedUrl;
  }
}
