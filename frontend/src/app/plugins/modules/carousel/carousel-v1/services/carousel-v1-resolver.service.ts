import { Injectable } from '@angular/core';
import {ImagesAdminComponent} from '../pages/images-admin/images-admin.component';
import {EffectAdminComponent} from '../pages/effect-admin/effect-admin.component';
import {CarouselV1Component} from '../components/carousel-v1.component';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';


@Injectable({
  providedIn: 'root'
})
export class CarouselV1ResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return CarouselV1Component;
  }

  adminComponentsClass = [
    {
      label: 'Obrázky',
      component: ImagesAdminComponent,
      path: ''
    },
    {
      label: 'Efekty',
      component: EffectAdminComponent,
      path: ''
    }
  ];

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=5';
  }

  get identifier(): string {
    return PluginIdentifier.CAROUSEL_V1;
  }

  get description(): string {
    return 'Slider obrázků s animací';
  }

  get name(): string {
    return 'Carousel obrázků';
  }

  isAutoResizeHeight(): boolean {
    return false;
  }

  gridWidth(): number {
    return 9;
  }

  gridHeight(): number {
    return 18;
  }
}
