import {Component, OnInit, Type} from '@angular/core';
import {TextPluginConfigInterface} from './tools/interfaces/text-plugin-config-interface';
import {AbstractPlugin} from '../tools/abstract-class/abstract-plugin';
import {SettingSubjectAbleInterface} from '../../shared/core/components/move-able-settings/tools/interfaces/setting-subject-able-interface';
import {TextPluginAdminComponent} from './admin/text-plugin-admin/text-plugin-admin.component';

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

  initEmptySettings(): void {
    this.settings.identifier = 'text_plugin';
    this.settings.text = 'Text plugin';
  }

  refreshView(): void {
  }
}
