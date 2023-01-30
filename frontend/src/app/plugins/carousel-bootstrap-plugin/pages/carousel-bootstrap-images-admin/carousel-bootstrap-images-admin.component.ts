import { Component, OnInit } from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {CarouselBootstrapConfigInterface} from '../../interfaces/carousel-bootstrap-config-interface';

@Component({
  selector: 'app-carousel-bootstrap-images-admin',
  templateUrl: './carousel-bootstrap-images-admin.component.html',
  styleUrls: ['./carousel-bootstrap-images-admin.component.css']
})
export class CarouselBootstrapImagesAdminComponent extends AbstractAdminSetting<CarouselBootstrapConfigInterface> implements OnInit {

  ngOnInit(): void {
  }

  createAdminForm(settings: CarouselBootstrapConfigInterface) {
  }

  onClickAddImageButton() {

  }

  onClickRemoveImageButton() {

  }
}
