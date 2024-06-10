import {Component} from '@angular/core';
import {AbstractPlugin} from "../../../../abstract-class/abstract-plugin";
import {ButtonConfigInterface} from "../../interfaces/button-config-interface";
import {set} from "husky";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends AbstractPlugin<ButtonConfigInterface>{

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }

  protected readonly set = set;
}
