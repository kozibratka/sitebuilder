import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MenuBuilderComponent} from '../menu-builder/menu-builder.component';
import {PaletteBuilderComponent} from '../palette-builder/palette-builder.component';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css']
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  @ViewChild(MenuBuilderComponent) childMenu: MenuBuilderComponent;
  @ViewChild(PaletteBuilderComponent) childPalette: PaletteBuilderComponent;

  constructor() { }

  ngAfterViewInit(): void {
     this.childMenu.menuCdk.connectedTo = this.childPalette.paletteCdk;
  }

  ngOnInit(): void {
  }

}
