import {Injectable} from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {VideoAdminComponent} from '../pages/video-admin/video-admin.component';
import {VideoComponent} from '../components/video/video.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {VideoConfigInterface} from "../interfaces/video-config-interface";
import {VideoDimensionAdminComponent} from "../pages/video-dimension-admin/video-dimension-admin.component";

@Injectable({
  providedIn: 'root'
})
export class VideoResolverService extends AbstractPluginResolver<VideoConfigInterface> {

  adminComponentsClass = [
    {
      label: 'Video',
      component: VideoAdminComponent,
      path: ''
    },
    {
      label: 'Rozměry',
      component: VideoDimensionAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return VideoComponent;
  }

  get description(): string {
    return 'Video';
  }

  getMenuImage(): string {
    return 'play_circle';
  }

  gridHeight(): number {
    return 13;
  }

  gridWidth(): number {
    return 26;
  }

  get identifier(): string {
    return PluginIdentifier.VIDEO_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Video';
  }

  getEmptySettings(): VideoConfigInterface {
    return {
      identifier: PluginIdentifier.VIDEO_V1,
      videoPath: 'https://www.youtube.com/embed?v=2Gg6Seob5Mg&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E&ab_channel=NOCOPYRIGHTMOTIONGRAPHICS',
      height: 250,
    };
  }
}
