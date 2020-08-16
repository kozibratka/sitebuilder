import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css']
})
export class PaletteBuilderComponent implements OnInit {

  baseBlocks: { image: string, id: number }[];

  constructor() {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/0086985?text=5', id: 2}
    ];
  }

  ngOnInit(): void {
  }

}
