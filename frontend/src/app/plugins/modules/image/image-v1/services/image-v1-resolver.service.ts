import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {ImageV1Component} from '../components/image-v1/image-v1.component';
import {ImageV1AdminComponent} from '../pages/image-v1-admin/image-v1-admin.component';

@Injectable({
  providedIn: 'root'
})
export class ImageV1ResolverService extends AbstractPluginResolver {

  adminComponentsClass = [
    {
      label: 'Obrázek',
      component: ImageV1AdminComponent,
      path: ''
    },
  ];

  get componentClass(): new(...args: any[]) => {} {
    return ImageV1Component;
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
    return 'Obrázek v1';
  }
}
