import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit {

  baseBlocks: { image: string, id: number }[];

  constructor() {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000000?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/008254?text=5', id: 2}
    ];
  }

  drop(event: CdkDragDrop<{ image: string, id: number }[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit(): void {
  }

}
