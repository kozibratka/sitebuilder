import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {VideoV1AdminComponent} from '../pages/video-v1-admin/video-v1-admin.component';
import {VideoV1Component} from '../components/video-v1/video-v1.component';

@Injectable({
  providedIn: 'root'
})
export class VideoV1ResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Obrázek',
      component: VideoV1AdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return VideoV1Component;
  }

  get description(): string {
    return 'Video';
  }

  getMenuImage(): string {
    return 'video';
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
