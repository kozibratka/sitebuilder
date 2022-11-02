import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

export abstract class AbstractPlugin<T extends BasePlugConfigInterface>{
  settings: T;

  abstract initEmptySettings(): T;

  abstract refreshView(): void;

  initializeSettings(settings: {}): void {
    if (!settings) {
      this.settings = this.initEmptySettings();
    } else {
      this.settings = settings as T;
    }
  }
}
