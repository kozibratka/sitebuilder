/// <reference types="jqueryui" />
import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {MenuPluginResolverService} from '../tools/services/menu-plugin-resolver.service';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  baseBlocks: { image: string, id: number }[];

  constructor(
    public menuPluginResolverServices: MenuPluginResolverService,
    private zone: NgZone
  ) {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000000?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/008254?text=5', id: 2}
    ];
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      $('.menu-element .menu-element-item').draggable({
        revert: 'invalid',
        handle: 'img',
        scroll: false,
        appendTo: 'body',
        helper: 'clone'
      });
    });
  }

  ngOnInit(): void {

  }

}
