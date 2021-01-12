import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {PluginComponentInterface} from '../../admin/entry-route/administration/admin/site-builder/page-builder/palette-builder/page-block/palette-item-component/tools/interfaces/plugin-component-interface';
import {TextPluginSettingsInterface} from './tools/interfaces/text-plugin-settings-interface';
import {AbstractPluginComponent} from '../tools/abstract-class/abstract-plugin-component';

@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-plugin.component.html',
  styleUrls: ['./text-plugin.component.css']
})
export class TextPluginComponent extends AbstractPluginComponent<TextPluginSettingsInterface>
  implements OnInit, PluginComponentInterface, AfterViewChecked {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getLink(): { commands: any[]; extras?: NavigationExtras } {
    return {commands: ['text-plugin/text-plugin-admin']};
  }

  initEmptySettings(): void {
    this.settings.identifier = 'text_plugin';
    this.settings.text = 'Text plugin';
  }

  refreshView(): void {
  }

  ngAfterViewChecked(): void {
  }
}
