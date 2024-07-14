import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../shared/constants/plugin-identifier';
import {ImagesListAdmin} from "../../shared/components/admin-pages/images-list-admin/images-list-admin.component";
import {GalleryConfigInterface} from "../interfaces/gallery-config-interface";
import {GalleryComponent} from "../components/gallery/gallery.component";
import {GallerySizeAdminComponent} from "../pages/gallery-size-admin/gallery-size-admin.component";


@Injectable({
  providedIn: 'root'
})
export class GalleryResolverService extends AbstractPluginResolver<GalleryConfigInterface>{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return GalleryComponent;
  }

  adminComponentsClass = [
    {
      label: 'Obrázky',
      component: ImagesListAdmin,
      path: ''
    },
    {
      label: 'Rozměr miniatur',
      component: GallerySizeAdminComponent,
      path: ''
    },
  ];

  getMenuImage(): string {
    return 'photo_library';
  }

  get identifier(): string {
    return PluginIdentifier.GALLERY_V1;
  }

  get description(): string {
    return 'Galerie obrázků';
  }

  get name(): string {
    return 'Galerie obrázků';
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

  getEmptySettings(): GalleryConfigInterface {
    return {
      identifier: PluginIdentifier.GALLERY_V1,
      thumbnailHeight: 100,
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
