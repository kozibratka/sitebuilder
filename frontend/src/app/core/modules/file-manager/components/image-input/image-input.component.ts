import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileManagerModalService} from "../../services/file-manager-modal.service";
import {MatDialog} from "@angular/material/dialog";
import {PixabayComponent} from "../pixabay/pixabay.component";

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
  @Output() imagePath = new EventEmitter<string>();
  @Input() miniature = false;
  @Input() path = '';


  constructor(
    private fileManagerModalService: FileManagerModalService,
    private dialog: MatDialog,
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
    dialog.afterClosed().subscribe(value => {

    });
  }
}
