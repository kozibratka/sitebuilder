import {AfterViewChecked, Component} from '@angular/core';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {VideoV1ConfigInterface} from '../../interfaces/video-v1-config-interface';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-video-v1',
  templateUrl: './video-v1.component.html',
  styleUrls: ['./video-v1.component.css']
})
export class VideoV1Component extends AbstractPlugin<VideoV1ConfigInterface> implements AfterViewChecked{


  constructor(
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngAfterViewChecked(): void {
    console.log('fffwww');
  }

  initEmptySettings(): VideoV1ConfigInterface {
    return {
      identifier: PluginIdentifier.VIDEO_V1,
      videoPath: 'https://www.youtube.com/embed?v=2Gg6Seob5Mg&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E&ab_channel=NOCOPYRIGHTMOTIONGRAPHICS',
    };
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }

  getVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.settings.videoPath);
  }
}
