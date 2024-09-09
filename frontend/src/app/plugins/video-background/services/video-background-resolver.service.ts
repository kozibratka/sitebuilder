import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from "../../../page/services/abstract-classes/abstract-plugin-resolver";
import {VideoBackgroundConfigInterface} from "../interfaces/video-background-config-interface";
import {PluginIdentifier} from "../../shared/constants/plugin-identifier";
import {VideoBackgroundComponent} from "../components/video-background/video-background.component";
import {VideoBackgroundAdminComponent} from "../pages/video-background-admin/video-background-admin.component";

@Injectable({
  providedIn: 'root'
})
export class VideoBackgroundResolverService extends AbstractPluginResolver<VideoBackgroundConfigInterface>{

  adminComponentsClass = [
    {
      label: 'Video',
      component: VideoBackgroundAdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return VideoBackgroundComponent;
  }

  get description(): string {
    return 'Video pozadí';
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
    return PluginIdentifier.VIDEO_BACKGROUND_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Video - pozadí';
  }

  getEmptySettings(): VideoBackgroundConfigInterface {
    return {
      identifier: PluginIdentifier.VIDEO_BACKGROUND_V1,
      opacity: 10,
      grayScale: 20,
      videoPath: 'https://www.youtube.com/embed?v=2Gg6Seob5Mg&list=PLGmxyVGSCDKvmLInHxJ9VdiwEb82Lxd2E&ab_channel=NOCOPYRIGHTMOTIONGRAPHICS',
      height: 250,
    };
  }
}
