import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselBootstrapPluginComponent} from '../carousel-bootstrap-plugin.component';
import {PluginIdentifier} from '../../tools/constants/plugin-identifier';
import {CarouselBootstrapImagesAdminComponent} from '../pages/carousel-bootstrap-images-admin/carousel-bootstrap-images-admin.component';


@Injectable({
  providedIn: 'root'
})
export class CarouselBootstrapPluginResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return CarouselBootstrapPluginComponent;
  }

  adminComponentsClass() {
    return [
      {
        label: 'Obrázek',
        component: CarouselBootstrapImagesAdminComponent,
        path: ''
      }
    ];
  }

  getMenuImage(): string {
    return 'https://via.placeholder.com/300/000000?text=5';
  }

  get menuImageGridSize(): number {
    return 2;
  }

  get menuImageSize(): { x: number; y: number } {
    return {x: 2, y: 2};
  }

  get identifier(): string {
    return PluginIdentifier.CAROUSEL_BOOTSTRAP_PLUGIN;
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
    return 5;
  }

  gridHeight(): number {
    return 5;
  }
}
