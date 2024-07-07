import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileManagerModalService} from "../../../../../../core/modules/file-manager/services/file-manager-modal.service";
import {MatDialog} from "@angular/material/dialog";
import {PixabayComponent} from "../../../pixabay/pixabay.component";
import {FileManagerService} from "../../../../../../core/modules/file-manager/services/file-manager.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-image-input',
  standalone: true,
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css'],
  imports: [
    CommonModule,
  ]
})
export class ImageInputComponent {
  @Output() imagePath = new EventEmitter<string>();
  @Input() miniature = false;
  @Input() path = '';


  constructor(
    private fileManagerModalService: FileManagerModalService,
    private dialog: MatDialog,
    private fileManagerService: FileManagerService,
  ) {
  }


  onClickAddImageButton() {
    this.fileManagerModalService.open('image').subscribe(value => {
      if (value.eventName === 'selected') {
        this.path = value.files[0]?.publicPath;
        this.imagePath.emit(this.path);
      }
    });
  }

  removeImage() {
    this.path = '';
    this.imagePath.emit('');
  }

  openPixabay() {
    let dialog = this.dialog.open(PixabayComponent, {maxWidth: '36vw', minWidth: '36vw'});
    dialog.beforeClosed().subscribe(imageDetail => {
      if (!imageDetail) {
        return;
      }
      let imageUrl = imageDetail.largeImageURL;
      this.fileManagerService.downloadFile(imageUrl, 'pixabay', imageDetail.id+'.jpg').subscribe(value => {
        this.imagePath.emit(value);
        }
      );
    });
  }
}
