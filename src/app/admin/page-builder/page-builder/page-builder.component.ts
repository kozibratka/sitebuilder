import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {QuickMenuMessenger} from './palette-builder/palette-item-quick-menu/interfaces/quick-menu-messenger';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService,
    {provide: 'QuickMenuMessenger', useFactory: () => new Subject<QuickMenuMessenger>()}
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
