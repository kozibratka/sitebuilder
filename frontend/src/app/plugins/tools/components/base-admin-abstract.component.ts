import {Component, Injector, OnDestroy, ViewChildren} from '@angular/core';
import {FlashDataService} from '../../../core/services/flash-data.service';
import {PluginAdminComponent} from '../../base-admin/admin/plugin-admin.component';
import {InputFormErrorGrouperDirective} from '../../../core/directives/form-error/input-form-error-grouper.directive';
import {EventEmitterService} from '../../../core/services/event-emitter-service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-base-settings',
  template: ''
})
export abstract class BaseAdminAbstractComponent<T>{
  protected selectedComponent: T;
  pluginAdminComponent: PluginAdminComponent;
  eventEmitterService: EventEmitterService<boolean>;
  @ViewChildren(InputFormErrorGrouperDirective) inputFormErrorGrouperDirectives: InputFormErrorGrouperDirective[];

  constructor(injector: Injector) {
    this.selectedComponent = injector.get(FlashDataService).get('selectedComponent');
    this.pluginAdminComponent = injector.get(PluginAdminComponent);
    this.eventEmitterService = injector.get(EventEmitterService);
  }

  registerInvalidFormEvent(formGroup: FormGroup): void {
    formGroup.statusChanges.subscribe(status => {
      this.eventEmitterService.emit('pluginAdminSettingsInvalid', true);
    });
  }

}
