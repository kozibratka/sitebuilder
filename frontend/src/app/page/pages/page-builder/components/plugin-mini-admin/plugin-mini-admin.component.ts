import {Component, Inject, ViewChild} from '@angular/core';
import {MiniAdminComponent} from '../../../../../core/components/mini-admin/mini-admin.component';
import {AdminAbleInterface} from '../../../../../core/components/mini-admin/tools/interfaces/admin-able-interface';
import {PageInterface} from '../../../../interfaces/page-interface';
import {SettingAbleInterface} from '../../../../../core/components/mini-admin/tools/interfaces/setting-able-interface';
import {BasePlugConfigInterface} from '../../../../../plugins/interfaces/base-plug-config-interface';

@Component({
  selector: 'app-plugin-mini-admin',
  templateUrl: './plugin-mini-admin.component.html',
  styleUrls: ['./plugin-mini-admin.component.css']
})
export class PluginMiniAdminComponent {
  @ViewChild(MiniAdminComponent, {static: true}) miniAdmin: MiniAdminComponent;
  globalPlugins: BasePlugConfigInterface[] = [];
  private globalPluginsSelect = [];
  miniAdminParams: AdminAbleInterface & SettingAbleInterface;
  constructor(
  ) {
  }
  refreshGlobalPluginSelect(identifier: string) {
    this.globalPluginsSelect = this.globalPlugins.filter(value => value.identifier === identifier);
  }

  initSettingsFromSelect(idGlobalPlugin?: string) {
    if (idGlobalPlugin) {
      Object.assign(this.miniAdmin.settings, this.globalPlugins.filter(value => value.id === parseInt(idGlobalPlugin, 10))[0]);
    } else {
      (this.miniAdmin.settings as BasePlugConfigInterface).id = null;
    }
  }

  setInitParams(value: AdminAbleInterface & SettingAbleInterface) {
    this.miniAdminParams = value;
  }
}
