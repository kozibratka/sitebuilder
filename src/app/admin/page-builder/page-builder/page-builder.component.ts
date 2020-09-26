import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [MenuPluginResolverService]
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
