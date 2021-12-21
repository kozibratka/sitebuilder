import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {Point} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-context-menu-v2',
  templateUrl: './context-menu-v2.component.html',
  styleUrls: ['./context-menu-v2.component.css']
})
export class ContextMenuV2Component implements OnInit {

  private _menu: MatMenu;
  onCloseCallback: () => void;
  @ViewChild(MatMenuTrigger, {static: true}) private button: MatMenuTrigger;
  @HostBinding('style.left') left = '0px';
  @HostBinding('style.top') top = '0px';

  constructor() { }

  ngOnInit(): void {
  }

  get menu(): MatMenu {
    return this._menu;
  }

  set menu(value: MatMenu) {
    this._menu = value;
  }

  showMenu(position: Point, onCloseCallback: () => void) {
    this.button.openMenu();
    this.left = position.x + 'px';
    this.top = position.y + 'px';
    this.onCloseCallback = onCloseCallback;
  }

  menuClose() {
    this.onCloseCallback();
  }
}
