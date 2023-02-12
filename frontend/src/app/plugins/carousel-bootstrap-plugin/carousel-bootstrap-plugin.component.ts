import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractPlugin} from '../tools/abstract-class/abstract-plugin';
import {CarouselBootstrapConfigInterface} from './interfaces/carousel-bootstrap-config-interface';
import {PluginIdentifier} from '../tools/constants/plugin-identifier';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-carousel-bootstrap-plugin',
  templateUrl: './carousel-bootstrap-plugin.component.html',
  styleUrls: [
    './carousel-bootstrap-plugin.component.css'
  ],
})
export class CarouselBootstrapPluginComponent extends AbstractPlugin<CarouselBootstrapConfigInterface> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.refreshView();
  }

  initEmptySettings(): CarouselBootstrapConfigInterface {
    return {
      identifier: PluginIdentifier.CAROUSEL_BOOTSTRAP_PLUGIN,
      autostart: true,
      intervalRotate: 3000,
      images: [
        {h1: 'Text 1', h2: 'Text 2', path: 'https://picsum.photos/id/944/900/500'},
        {h1: 'Text 3', h2: 'Text 4', path: 'https://picsum.photos/id/1011/900/500'},
        {h1: 'Text 5', h2: 'Text 6', path: 'https://picsum.photos/id/984/900/500'},
        {h1: 'Text 7', h2: 'Text 8', path: 'https://picsum.photos/id/985/900/500'},
        {h1: 'Text 9', h2: 'Text 10', path: 'https://picsum.photos/id/986/900/500'},
        {h1: 'Text 11', h2: 'Text 12', path: 'https://picsum.photos/id/987/900/500'},
        {h1: 'Text 13', h2: 'Text 14', path: 'https://picsum.photos/id/988/900/500'},
      ]
    };
  }

  refreshView(): void {
  }
}
