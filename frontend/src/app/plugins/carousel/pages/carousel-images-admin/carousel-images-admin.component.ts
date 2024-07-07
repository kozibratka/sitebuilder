import { Component, OnInit } from '@angular/core';
import {CarouselConfigInterface} from '../../interfaces/carousel-config-interface';
import {CdkDrag, DropListOrientation, moveItemInArray} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule, MixedCdkDragSizeHelperDirective} from 'angular-mixed-cdk-drag-drop';
import {AbstractAdminSetting} from '../../../shared/abstract-class/abstract-admin-setting';
import {FileManagerModalService} from '../../../../core/modules/file-manager/services/file-manager-modal.service';
import {FileManagerService} from '../../../../core/modules/file-manager/services/file-manager.service';
import {
  AnimationHiderComponent
} from "../../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-carousel-bootstrap-images-admin',
  standalone: true,
  templateUrl: 'carousel-images-admin.component.html',
  imports: [
    CommonModule,
    MixedCdkDragDropModule,
    AnimationHiderComponent,
    MatButton,
    FormsModule
  ],
  styleUrls: ['carousel-images-admin.component.css']
})
export class CarouselImagesAdminComponent extends AbstractAdminSetting<CarouselConfigInterface> implements OnInit {

  showIconIndex = -2;

  handler = false;
  orientation: DropListOrientation = 'horizontal';
  percentWidth = 15;
  percentHeight = 0;

  constructor(
    private fileManagerModalService: FileManagerModalService,
    private fileManagerService: FileManagerService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  createAdminForm(settings: CarouselConfigInterface) {
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

  onSizeChange(event: { drag: CdkDrag; containerSize: DOMRectReadOnly }) {
    MixedCdkDragSizeHelperDirective.defaultEmitter(event, Number(this.percentWidth), Number(this.percentHeight));
  }

  dropped(event: { previousIndex: number; currentIndex: number }) {
    moveItemInArray(this.settings.images, event.previousIndex, event.currentIndex);
  }
}
