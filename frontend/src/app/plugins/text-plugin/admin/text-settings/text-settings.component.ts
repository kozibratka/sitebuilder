import {Component, Injector, OnInit} from '@angular/core';
import {TextPluginComponent} from '../../text-plugin.component';
import {BaseSettingsAbstract} from '../../../tools/abstract-class/base-settings-abstract';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-settings.component.html',
  styleUrls: ['./text-settings.component.css']
})
export class TextSettingsComponent extends BaseSettingsAbstract<TextPluginComponent> implements OnInit{

  plugin: TextPluginComponent;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
