import { Component, OnInit } from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {CarouselBootstrapConfigInterface} from '../../interfaces/carousel-bootstrap-config-interface';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-carousel-bootstrap-images-admin',
  templateUrl: './carousel-bootstrap-images-admin.component.html',
  styleUrls: ['./carousel-bootstrap-images-admin.component.css']
})
export class CarouselBootstrapImagesAdminComponent extends AbstractAdminSetting<CarouselBootstrapConfigInterface> implements OnInit {

  imagesChunks = [];

  ngOnInit(): void {
    this.imagesChunks = _.chunk(this.settings.images, 2);
  }

  createAdminForm(settings: CarouselBootstrapConfigInterface) {
  }

  onClickAddImageButton() {

  }

  onClickRemoveImageButton() {

  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.settings.images = _.flatten(this.imagesChunks);
    this.imagesChunks = _.chunk(this.settings.images, 2);
  }
}
