import { Injectable } from '@angular/core';
import {CarouselV1Component} from '../components/carousel-v1.component';
import {AbstractPluginResolver} from '../../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';
import {CarouselV1ImagesAdminComponent} from '../pages/carousel-v1-images-admin/carousel-v1-images-admin.component';
import {CarouselV1EffectAdminComponent} from '../pages/carousel-v1-effect-admin/carousel-v1-effect-admin.component';


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
      component: CarouselV1ImagesAdminComponent,
      path: ''
    },
    {
      label: 'Efekty',
      component: CarouselV1EffectAdminComponent,
      path: ''
    }
  ];

  getMenuImage(): string {
    return 'view_carousel';
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
