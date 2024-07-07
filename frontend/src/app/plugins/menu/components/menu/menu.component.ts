import {Component, OnInit} from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-simple-plugin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css']
})
export class MenuComponent extends AbstractPlugin<MenuConfigInterface> implements OnInit{
  itemsAsNestedArray = [];
  ngOnInit(): void {
    this.refreshView();
  }

  refreshView(): void {
    this.itemsAsNestedArray = ArrayHelper.objectWithLevelToNestedArray(this.settings.items);
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
