import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselImagesAdminComponent} from '../pages/carousel-images-admin/carousel-images-admin.component';
import {CarouselEffectAdminComponent} from '../pages/carousel-effect-admin/carousel-effect-admin.component';
import {PluginIdentifier} from '../../../constants/plugin-identifier';
import {CarouselComponent} from '../components/carousel/carousel.component';


@Injectable({
  providedIn: 'root'
})
export class CarouselResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return CarouselComponent;
  }

  adminComponentsClass = [
    {
      label: 'Obrázky',
      component: CarouselImagesAdminComponent,
      path: ''
    },
    {
      label: 'Efekty',
      component: CarouselEffectAdminComponent,
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
