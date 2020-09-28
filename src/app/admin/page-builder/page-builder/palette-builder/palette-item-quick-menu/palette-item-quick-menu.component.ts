import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-palette-item-quick-menu',
  templateUrl: './palette-item-quick-menu.component.html',
  styleUrls: ['./palette-item-quick-menu.component.css']
})
export class PaletteItemQuickMenuComponent implements OnInit {

  @HostBinding('style.color') leftPosition = 'red';

  constructor() {

  }

  ngOnInit(): void {
    //this.leftPosition = 55;
  }

}
