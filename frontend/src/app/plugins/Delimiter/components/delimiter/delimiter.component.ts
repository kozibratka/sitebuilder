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
}
