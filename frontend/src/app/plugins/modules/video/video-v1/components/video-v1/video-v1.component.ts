import { Component } from '@angular/core';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
import {VideoV1ConfigInterface} from '../../interfaces/video-v1-config-interface';
import {PluginIdentifier} from '../../../../../constants/plugin-identifier';

@Component({
  selector: 'app-video-v1',
  templateUrl: './video-v1.component.html',
  styleUrls: ['./video-v1.component.css']
})
export class VideoV1Component extends AbstractPlugin<VideoV1ConfigInterface>{
  initEmptySettings(): VideoV1ConfigInterface {
    return {
      identifier: PluginIdentifier.VIDEO_V1,
      videoPath: 'https://www.youtube.com/watch?v=2Gg6Seob5Mg&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E&ab_channel=NOCOPYRIGHTMOTIONGRAPHICS',
    };
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
