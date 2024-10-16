import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

export abstract class AbstractPlugin<T extends BasePlugConfigInterface>{
  settings: T;

  lastAdminSettings: T = null;

  isDragged = false;

  abstract refreshView(): void;

  initializeSettings(settings: T): void {
    this.settings = settings;
  }
}
