import {Component, OnInit} from '@angular/core';
import {ConfigInterface} from '../../interfaces/config-interface';
import {AbstractPlugin} from '../../../../../abstract-class/abstract-plugin';
@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-v1.component.html',
  styleUrls: ['./text-v1.component.css']
})
export class TextV1Component extends AbstractPlugin<ConfigInterface>
  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  initEmptySettings(): ConfigInterface {
    return {
      identifier: 'text_v1',
      text: 'Text plugin'
    };
  }

  refreshView(): void {
  }
}
