import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TestSliderResolverService} from './menu-builder/services/menu-plugin-resolvers/test-slider-resolver.service';
import {AbstractMenuPluginResolver} from './menu-builder/services/menu-plugin-resolvers/abstract-menu-plugin-resolver';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [{provide: AbstractMenuPluginResolver, useClass: TestSliderResolverService, multi: true }]
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
