import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {CarouselBootstrapPluginComponent} from '../carousel-bootstrap-plugin.component';
import {PluginIdentifier} from '../../tools/constants/plugin-identifier';
import {ImagesAdminComponent} from '../pages/images-admin/images-admin.component';
import {EffectAdminComponent} from '../pages/effect-admin/effect-admin.component';


@Injectable({
  providedIn: 'root'
})
export class CarouselBootstrapPluginResolverService extends AbstractPluginResolver{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return CarouselBootstrapPluginComponent;
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
    return 9;
  }

  gridHeight(): number {
    return 18;
  }
}
