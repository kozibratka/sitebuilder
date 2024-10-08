import {Component, OnInit} from '@angular/core';
import {MenuConfigInterface} from '../../interfaces/menu-config-interface';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {ArrayHelper} from '../../../../core/helpers/array-helper';
import {CommonModule} from "@angular/common";
import {LinkDeactivateDirective} from "../../../../core/directives/link-deactivate.directive";
import {MenuItemInterface} from "../../interfaces/menu-item-interface";

@Component({
  selector: 'app-menu-simple-plugin',
  standalone: true,
  imports: [
    CommonModule,
    LinkDeactivateDirective,
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

  getLink(menuItemInterface: MenuItemInterface) {
    if (menuItemInterface.uniqueId) {
      return "#"+menuItemInterface.uniqueId;
    } else {
      return menuItemInterface.pageDetail.isHomepage ? '' : ('/'+menuItemInterface.pageDetail.pageUrl);
    }
  }
}
