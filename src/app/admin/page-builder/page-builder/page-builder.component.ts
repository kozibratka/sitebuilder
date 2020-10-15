import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from './tools/services/menu-plugin-resolver.service';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService
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
