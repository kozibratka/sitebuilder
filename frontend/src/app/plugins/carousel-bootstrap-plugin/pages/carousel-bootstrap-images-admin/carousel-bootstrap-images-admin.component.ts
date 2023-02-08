import { Component, OnInit } from '@angular/core';
import {AbstractAdminSetting} from '../../../tools/abstract-class/abstract-admin-setting';
import {CarouselBootstrapConfigInterface} from '../../interfaces/carousel-bootstrap-config-interface';
import {FileManagerModalService} from '../../../../core/modules/file-manager/services/file-manager-modal.service';
import {FileManagerService} from '../../../../core/modules/file-manager/services/file-manager.service';

@Component({
  selector: 'app-carousel-bootstrap-images-admin',
  templateUrl: './carousel-bootstrap-images-admin.component.html',
  styleUrls: ['./carousel-bootstrap-images-admin.component.css']
})
export class CarouselBootstrapImagesAdminComponent extends AbstractAdminSetting<CarouselBootstrapConfigInterface> implements OnInit {

  showIconIndex = -2;

  constructor(
    private fileManagerModalService: FileManagerModalService,
    private fileManagerService: FileManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  createAdminForm(settings: CarouselBootstrapConfigInterface) {
  }

  onClickAddImageButton() {
    this.fileManagerModalService.open().subscribe(value => {
      if (value.eventName === 'selected') {
        const images = value.files.filter(value1 => {
          return this.fileManagerService.isImage(value1);
        });

        this.settings.images.push(...images.map(value1 => {
          return {path: value1.publicPath, h2: 'New image text 1', h1: 'New imaget text 2'};
        }));
      }
    });

  }

  onClickRemoveImageButton(index: number) {
    this.settings.images.splice(index, 1);
  }
}
