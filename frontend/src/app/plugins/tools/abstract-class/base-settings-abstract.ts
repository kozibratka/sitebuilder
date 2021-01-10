import {Injector} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

export abstract class BaseSettingsAbstract<T> {
  protected component: T;

  constructor(injector: Injector) {
    injector.get(ActivatedRoute).data.subscribe(data => {
      this.setComponent(data.component);
    });
  }

  setComponent(component: T): void {
    this.component = component;
  }

}
