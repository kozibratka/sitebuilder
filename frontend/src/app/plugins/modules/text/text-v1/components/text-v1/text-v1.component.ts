import {Component, OnInit} from '@angular/core';
import {TextV1ConfigInterface} from '../../interfaces/text-v1-config-interface';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-v1.component.html',
  styleUrls: ['./text-v1.component.css']
})
export class TextV1Component extends AbstractPlugin<TextV1ConfigInterface>
  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  initEmptySettings(): TextV1ConfigInterface {
    return {
      identifier: 'text_v1',
      text: 'Text plugin'
    };
  }

  refreshView(): void {
  }
}
