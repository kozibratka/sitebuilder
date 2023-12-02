import {Component, OnInit} from '@angular/core';
import {TextConfigInterface} from '../../interfaces/text-config-interface';
import {AbstractPlugin} from '../../../../abstract-class/abstract-plugin';
@Component({
  selector: 'app-text-plugin',
  templateUrl: 'text.component.html',
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
