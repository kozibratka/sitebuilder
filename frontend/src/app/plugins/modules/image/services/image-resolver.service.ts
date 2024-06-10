import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {ImageAdminComponent} from '../pages/image-admin/image-admin.component';
import {ImageComponent} from '../components/image/image.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {StyleAdminComponent} from "../pages/style-admin/style-admin.component";
import {ImageConfigInterface} from "../interfaces/image-config-interface";

@Injectable({
  providedIn: 'root'
})
export class ImageResolverService extends AbstractPluginResolver<ImageConfigInterface> {

  adminComponentsClass = [
    {
      label: 'Obrázek',
      component: ImageAdminComponent,
      path: ''
    },
    {
      label: 'Vzhled',
      component: StyleAdminComponent,
      path: ''
    }
  ];

  get componentClass(): new(...args: any[]) => {} {
    return ImageComponent;
  }

  get description(): string {
    return 'Obrázek';
  }

  getMenuImage(): string {
    return 'image';
  }

  gridHeight(): number {
    return 13;
  }

  gridWidth(): number {
    return 26;
  }

  get identifier(): string {
    return PluginIdentifier.IMAGE_V1;
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  get name(): string {
    return 'Obrázek';
  }

  getEmptySettings(): ImageConfigInterface {
    return {
      identifier: PluginIdentifier.IMAGE_V1,
      imagePath: 'https://picsum.photos/seed/picsum/400/200',
      circle: 0,
      blur: 0,
      grayscale: 0,
      sepia: 0,
    };
  }
}
