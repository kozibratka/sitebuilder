import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

export abstract class AbstractPlugin<T extends BasePlugConfigInterface>{
  settings: T;

  lastAdminSettings: T = null;

  abstract refreshView(): void;

  initializeSettings(settings: T): void {
    this.settings = settings;
  }
}
