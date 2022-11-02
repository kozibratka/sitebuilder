import {Component, OnInit} from '@angular/core';
import {TextPluginConfigInterface} from './tools/interfaces/text-plugin-config-interface';
import {AbstractPlugin} from '../tools/abstract-class/abstract-plugin';

@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-plugin.component.html',
  styleUrls: ['./text-plugin.component.css']
})
export class TextPluginComponent extends AbstractPlugin<TextPluginConfigInterface>
  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  initEmptySettings(): TextPluginConfigInterface {
    return {
      identifier: 'text_plugin',
      text: 'Text plugin'
    };
  }

  refreshView(): void {
  }
}
