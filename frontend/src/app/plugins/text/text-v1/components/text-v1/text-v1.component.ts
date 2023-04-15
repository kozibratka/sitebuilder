import {Component, OnInit} from '@angular/core';
import {AbstractPlugin} from '../../../../tools/abstract-class/abstract-plugin';
import {ConfigInterface} from '../../interfaces/config-interface';
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
      identifier: 'text_plugin',
      text: 'Text plugin'
    };
  }

  refreshView(): void {
  }
}
