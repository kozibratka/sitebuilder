/// <reference types="jqueryui" />
import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {PageBlockInterface} from '../../interfaces/page-block-interface';

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
      {image: 'https://via.placeholder.com/300/000000?text=2', id: 1}
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

  clonePageBlock = (item) => {
    const pageBlock: PageBlockInterface = {height: 20, paletteGridItems: []};
    return pageBlock; // this is what happens if sortablejsCloneFunction is not provided. Add your stuff here
  }

}
