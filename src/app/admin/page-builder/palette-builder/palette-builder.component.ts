import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, CdkDragEnter, CdkDropList, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {PageBuilderComponent} from '../page-builder/page-builder.component';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css']
})
export class PaletteBuilderComponent implements OnInit {

  @ViewChild(CdkDropList) paletteCdk: CdkDropList;
  baseBlocks: { image: string, id: number }[];

  constructor(private pageBuilderComponent: PageBuilderComponent) {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/0086985?text=5', id: 2}
    ];
  }

  drop(event: CdkDragDrop<{ image: string, id: number }[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  entered(event: CdkDragEnter<{ image: string, id: number }[]>): void{
    // console.log(event.container.data);
    // console.log(this.pageBuilderComponent.childMenu.baseBlocks.push({image: 'https://via.placeholder.com/300/0086985?text=5', id: 8}));
  }

  ngOnInit(): void {
  }

}
