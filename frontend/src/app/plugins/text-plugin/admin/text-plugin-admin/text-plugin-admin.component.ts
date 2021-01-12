import {Component, Injector, OnInit} from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
import {BaseSettingsAbstract} from '../../../tools/abstract-class/base-settings-abstract';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-plugin-admin.component.html',
  styleUrls: ['./text-plugin-admin.component.css']
})
export class TextPluginAdminComponent extends BaseSettingsAbstract<TextPluginComponent> implements OnInit{

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

  }

}
