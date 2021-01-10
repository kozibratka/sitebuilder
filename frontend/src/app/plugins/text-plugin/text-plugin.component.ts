import { Component, OnInit } from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {PluginComponentInterface} from '../../admin/entry-route/administration/admin/site-builder/page-builder/palette-builder/page-block/palette-item-component/tools/interfaces/plugin-component-interface';

@Component({
  selector: 'app-text-plugin',
  templateUrl: './text-plugin.component.html',
  styleUrls: ['./text-plugin.component.css']
})
export class TextPluginComponent implements OnInit, PluginComponentInterface {

  constructor() {  }

  ngOnInit(): void {
  }

  getLink(): { commands: any[]; extras?: NavigationExtras } {
    return {commands: ['text-plugin/text-settings']};
  }

  initializeSettings(settings: {}, isFromDatabase: boolean): void {
  }
}
