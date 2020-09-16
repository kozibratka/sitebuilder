import {AfterViewChecked, Component, ViewChild, ViewChildren} from '@angular/core';
import {PaletteBlockGridstackService} from './palette-block/services/palette-block-gridstack.service';
import {PaletteBlockComponent} from './palette-block/palette-block.component';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css'],
})
export class PaletteBuilderComponent implements AfterViewChecked{

  baseBlocks: { image: string, id: number }[];
  isDraggedContent = false;

  constructor() {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
    ];
  }

  ngAfterViewChecked(): void {

  }

  blockDragStart(): void {
    this.isDraggedContent = true;
  }

  blockDragStop(): void {
    this.isDraggedContent = false;
  }

}
