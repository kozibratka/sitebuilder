import {Component, OnInit, ViewChild} from '@angular/core';
import {CdkDropList} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit {

  @ViewChild(CdkDropList) menuCdk: CdkDropList;
  baseBlocks: { image: string, id: number }[];

  constructor() {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000000?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/008254?text=5', id: 2}
    ];
  }

  ngOnInit(): void {
  }

}
