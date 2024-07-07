import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselImagesAdminComponent} from '../pages/carousel-images-admin/carousel-images-admin.component';
import {CarouselEffectAdminComponent} from '../pages/carousel-effect-admin/carousel-effect-admin.component';
import {PluginIdentifier} from '../../shared/constants/plugin-identifier';
import {CarouselComponent} from '../components/carousel/carousel.component';
import {CarouselConfigInterface} from "../interfaces/carousel-config-interface";


@Injectable({
  providedIn: 'root'
})
export class CarouselResolverService extends AbstractPluginResolver<CarouselConfigInterface>{

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

  getEmptySettings(): CarouselConfigInterface {
    return {
      identifier: PluginIdentifier.CAROUSEL_V1,
      autostart: true,
      intervalRotate: 3000,
      images: [
        {h1: 'Text 1', h2: 'Text 2', path: 'https://picsum.photos/id/944/900/500'},
        {h1: 'Text 3', h2: 'Text 4', path: 'https://picsum.photos/id/1011/900/500'},
        {h1: 'Text 5', h2: 'Text 6', path: 'https://picsum.photos/id/984/900/500'},
        {h1: 'Text 7', h2: 'Text 8', path: 'https://picsum.photos/id/985/900/500'},
        {h1: 'Text 9', h2: 'Text 10', path: 'https://picsum.photos/id/986/900/500'},
        {h1: 'Text 11', h2: 'Text 12', path: 'https://picsum.photos/id/987/900/500'},
        {h1: 'Text 13', h2: 'Text 14', path: 'https://picsum.photos/id/988/900/500'},
      ]
    };
  }
}
