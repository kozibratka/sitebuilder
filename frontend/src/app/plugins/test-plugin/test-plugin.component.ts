import { Component, OnInit } from '@angular/core';
import {NavigationExtras} from '@angular/router';
import {PluginComponentInterface} from '../../admin/entry-route/administration/admin/site-builder/page-builder/palette-builder/page-block/palette-item-component/tools/interfaces/plugin-component-interface';

@Component({
  selector: 'app-test',
  templateUrl: './test-plugin.component.html',
  styleUrls: ['./test-plugin.component.css']
})
export class TestPluginComponent implements OnInit, PluginComponentInterface {

  constructor() {  }

  ngOnInit(): void {
  }

  getLink(): { commands: any[]; extras?: NavigationExtras } {
    return {commands: ['test-plugin/color-settings']};
  }

  initializeSettings(settings: {}, isFromDatabase: boolean): void {
  }
}
