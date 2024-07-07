import {Component, OnInit} from '@angular/core';
import {TextConfigInterface} from '../../interfaces/text-config-interface';
import {AbstractPlugin} from '../../../shared/abstract-class/abstract-plugin';
import {SafeHtmlPipe} from "../../../../core/pipes/safe-html.pipe";
@Component({
  selector: 'app-text-plugin',
  standalone: true,
  templateUrl: 'text.component.html',
  imports: [
    SafeHtmlPipe
  ],
  styleUrls: ['text.component.css']
})
export class TextComponent extends AbstractPlugin<TextConfigInterface>
  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  refreshView(): void {
  }

  getDisabledStateWhenDraggingItem(): void {
  }
}
