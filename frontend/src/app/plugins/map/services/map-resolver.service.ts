import { Injectable } from '@angular/core';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PluginIdentifier} from '../../shared/constants/plugin-identifier';
import {MapConfigInterface} from "../interfaces/map-config-interface";
import {MapComponent} from "../components/map/map.component";
import {MapAdminComponent} from "../pages/map-admin/map-admin.component";


@Injectable({
  providedIn: 'root'
})
export class MapResolverService extends AbstractPluginResolver<MapConfigInterface>{

  constructor() { super(); }

  get componentClass(): new(...args: any[]) => {} {
    return MapComponent;
  }

  adminComponentsClass = [
    {
      label: 'Mapa',
      component: MapAdminComponent,
      path: ''
    },
  ];

  getMenuImage(): string {
    return 'public';
  }

  get identifier(): string {
    return PluginIdentifier.MAP_V1;
  }

  get description(): string {
    return 'Google mapa s nastavenou polohou';
  }

  get name(): string {
    return 'Google mapa';
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

  getEmptySettings(): MapConfigInterface {
    return {
      identifier: PluginIdentifier.MAP_V1,
      height: 300,
      lat: 49.173445155298346,
      lng: 14.492827395844262,
      title: 'Naše provozovna zde',
    };
  }
}
