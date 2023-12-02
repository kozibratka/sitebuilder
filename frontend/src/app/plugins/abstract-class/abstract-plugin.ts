import {BasePlugConfigInterface} from '../interfaces/base-plug-config-interface';

export abstract class AbstractPlugin<T extends BasePlugConfigInterface>{
  settings: T;

  abstract refreshView(): void;

  abstract getDisabledStateWhenDraggingItem(): any;

  initializeSettings(settings: T): void {
    this.settings = settings;
  }
}
