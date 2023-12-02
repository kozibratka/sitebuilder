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

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): any {
    return {autostart: false};
  }
}
