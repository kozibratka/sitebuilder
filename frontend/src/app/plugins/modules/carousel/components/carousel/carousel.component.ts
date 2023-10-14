import {Component, OnInit} from '@angular/core';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
import {CarouselConfigInterface} from '../../interfaces/carousel-config-interface';
import {PluginIdentifier} from '../../../../constants/plugin-identifier';

@Component({
  selector: 'app-carousel-bootstrap-plugin',
  templateUrl: 'carousel.component.html',
  styleUrls: [
    'carousel.component.css'
  ],
})
export class CarouselComponent extends AbstractPlugin<CarouselConfigInterface> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.refreshView();
  }

  initEmptySettings(): CarouselConfigInterface {
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

  getDisabledStateWhenDraggingItem(): any {
    return {autostart: false};
  }
}
