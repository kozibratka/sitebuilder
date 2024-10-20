import { Component } from '@angular/core';
import {AbstractPlugin} from "../../../shared/abstract-class/abstract-plugin";
import {DelimiterConfigInterface} from "../../interfaces/delimiter-config-interface";

@Component({
  selector: 'app-delimiter',
  standalone: true,
  imports: [],
  templateUrl: './delimiter.component.html',
  styleUrl: './delimiter.component.css'
})
export class DelimiterComponent extends AbstractPlugin<DelimiterConfigInterface> {
  refreshView(): void {
  }

  getColor() {
    let style = {};
    if (this.settings.color) {
      switch (this.settings.type) {
        case 'v1':
          style =  {backgroundImage: `linear-gradient(to right, #ccc, ${this.settings.color}, #ccc)`}
          break;
        case 'v2':
          style =  {backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0), ${this.settings.color}, rgba(0, 0, 0, 0))`}
          break;
        case 'v3':
          style =  {background: this.settings.color}
          break;
        case 'v4':
          style =  {boxShadow: `inset 0 12px 12px -12px ${this.settings.color}`}
          break;
        case 'v5':
          style =  {boxShadow: `0 0 10px 1px ${this.settings.color}`}
          break;
        case 'v6':
          style =  {borderBottom: `1px solid ${this.settings.color}`}
          break;
        case 'v7':
          style =  {borderColor: `${this.settings.color}`}
          break;
        case 'v8':
          style =  {color: `${this.settings.color}`, borderTop: `medium double ${this.settings.color}`}
          break;
      }
    }
    return style;
  }
}
