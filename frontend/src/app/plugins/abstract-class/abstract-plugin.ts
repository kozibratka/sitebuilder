import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

export abstract class AbstractPlugin<T extends BasePlugConfigInterface>{
  settings: T;

  abstract initEmptySettings(): T;

  abstract refreshView(): void;

  abstract getDisabledStateWhenDraggingItem(): any;

  initializeSettings(settings: BasePlugConfigInterface): void {
    if (!settings.id) {
      this.settings = Object.assign(settings, this.initEmptySettings());
    } else {
      this.settings = settings as T;
    }
  }
}
