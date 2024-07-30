import {Component, OnInit} from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {MapConfigInterface} from "../../interfaces/map-config-interface";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LinkDeactivateDirective} from "../../../../core/directives/link-deactivate.directive";
import {NgIf} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {
  latLng,
  tileLayer,
  LMap,
} from "leaflet";
declare let L:any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    FaIconComponent,
    LinkDeactivateDirective,
    NgIf,
    LeafletModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent extends AbstractPlugin<MapConfigInterface> implements OnInit{
  private map: LMap;
  private marker = null;
  public options: { center: any; layers: any[]; zoom: number };
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
    this.initOptions()
  }

  initOptions() {
    this.options = {
        zoom: 15,
        center: latLng(this.settings.lat, this.settings.lng),
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18})
        ],
      };
  }
  refreshView(): void {
    this.createMarker();
    if (this.map) {
      this.map.panTo(new L.LatLng(this.settings.lat, this.settings.lng));
    }
  }

  onMapReady(map: LMap) {
    this.map = map;
    this.createMarker();
  }

  createMarker() {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = new L.Marker([this.settings.lat, this.settings.lng]);
    this.marker.addTo(this.map);
    this.marker.bindTooltip(layer => this.settings.title);
  }
}
