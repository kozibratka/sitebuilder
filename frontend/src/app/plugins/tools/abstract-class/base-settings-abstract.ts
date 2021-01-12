import {Injector} from '@angular/core';
import {FlashDataService} from '../../../core/services/flash-data.service';
import {PluginAdminComponent} from '../../base-admin/admin/plugin-admin.component';

export abstract class BaseSettingsAbstract<T> {
  protected selectedComponent: T;
  pluginAdminComponent: PluginAdminComponent;

  constructor(injector: Injector) {
    this.selectedComponent = injector.get(FlashDataService).get('selectedComponent');
    this.pluginAdminComponent = injector.get(PluginAdminComponent);
  }

}
