import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {ImageAdminComponent} from '../pages/image-admin/image-admin.component';
import {ImageComponent} from '../components/image/image.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {StyleAdminComponent} from "../pages/style-admin/style-admin.component";

@Injectable({
  providedIn: 'root'
})
export class ImageResolverService extends AbstractPluginResolver {

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
    },
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
}
