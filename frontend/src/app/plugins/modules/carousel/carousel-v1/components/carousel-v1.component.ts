import {Component, OnInit} from '@angular/core';
import {ConfigInterface} from '../interfaces/config-interface';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';

@Component({
  selector: 'app-carousel-bootstrap-plugin',
  templateUrl: './carousel-v1.component.html',
  styleUrls: [
    './carousel-v1.component.css'
  ],
})
export class CarouselV1Component extends AbstractPlugin<ConfigInterface> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.refreshView();
  }

  initEmptySettings(): ConfigInterface {
    return {
      identifier: PluginIdentifier.CAROUSEL_V1,
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
