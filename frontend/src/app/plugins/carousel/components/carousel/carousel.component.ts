import {Component, OnInit} from '@angular/core';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {CarouselConfigInterface} from '../../interfaces/carousel-config-interface';
import {PluginIdentifier} from '../../../shared/constants/plugin-identifier';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel-bootstrap-plugin',
  standalone: true,
  templateUrl: 'carousel.component.html',
  styleUrls: [
    'carousel.component.css'
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide
  ]
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
