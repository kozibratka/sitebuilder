import {Injector} from '@angular/core';
import {FlashDataService} from '../../../core/services/flash-data.service';

export abstract class BaseSettingsAbstract<T> {
  private seletedComponent: T;

  constructor(injector: Injector) {
    this.seletedComponent = injector.get(FlashDataService).get('selectedComponent');
  }

}
