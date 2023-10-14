import {Injectable} from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {VideoAdminComponent} from '../pages/video-admin/video-admin.component';
import {VideoComponent} from '../components/video/video.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';

@Injectable({
  providedIn: 'root'
})
export class VideoResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Video',
      component: VideoAdminComponent,
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
    return 'Video v1';
  }
}
