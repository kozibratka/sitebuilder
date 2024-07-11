import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDropList, CdkDropListGroup, DropListOrientation, moveItemInArray} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule, MixedCdkDragSizeHelperDirective} from 'angular-mixed-cdk-drag-drop';
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {
  AnimationHiderComponent
} from "../../../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";
import {AbstractAdminSetting} from "../../../abstract-class/abstract-admin-setting";
import {CarouselConfigInterface} from "../../../../carousel/interfaces/carousel-config-interface";
import {FileManagerModalService} from "../../../../../core/modules/file-manager/services/file-manager-modal.service";
import {FileManagerService} from "../../../../../core/modules/file-manager/services/file-manager.service";
import {ImagesListInterface} from "../../../interfaces/images-list-interface";
import {BasePlugConfigInterface} from "../../../interfaces/base-plug-config-interface";

@Component({
  selector: 'images-list-admin',
  standalone: true,
  templateUrl: 'images-list-admin.component.html',
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    MixedCdkDragDropModule,
    AnimationHiderComponent,
    MatButton,
    FormsModule
  ],
  styleUrls: ['images-list-admin.component.css']
})
export class ImagesListAdmin extends AbstractAdminSetting<BasePlugConfigInterface & ImagesListInterface> implements OnInit {

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
