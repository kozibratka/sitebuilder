/// <reference types="jqueryui" />
import {AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, NgZone, OnInit} from '@angular/core';
import {AbstractMenuPluginResolver} from './services/menu-plugin-resolvers/abstract-menu-plugin-resolver';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  baseBlocks: { image: string, id: number }[];

  constructor(@Inject(AbstractMenuPluginResolver) public abstractMenuPluginResolver: AbstractMenuPluginResolver[], private zone: NgZone) {
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