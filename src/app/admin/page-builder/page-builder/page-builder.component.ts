import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {PaletteItemComponent} from './palette-builder/palette-block/palette-item/palette-item.component';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService,
    {provide: 'QuickMenuMessenger', useFactory: () => new Subject<PaletteItemComponent>()}
  ]
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }



}
