import {Component, Injector, ViewChildren} from '@angular/core';
import {FlashDataService} from '../../../core/services/flash-data.service';
import {PluginAdminComponent} from '../../base-admin/admin/plugin-admin.component';
import {InputFormErrorGrouperDirective} from '../../../core/directives/form-error/input-form-error-grouper.directive';

@Component({
  selector: 'app-base-settings',
  template: ''
})
export abstract class BaseAdminAbstractComponent<T> {
  protected selectedComponent: T;
  pluginAdminComponent: PluginAdminComponent;
  @ViewChildren(InputFormErrorGrouperDirective) inputFormErrorGrouperDirectives: InputFormErrorGrouperDirective[];

  constructor(injector: Injector) {
    this.selectedComponent = injector.get(FlashDataService).get('selectedComponent');
    this.pluginAdminComponent = injector.get(PluginAdminComponent);
  }

}
