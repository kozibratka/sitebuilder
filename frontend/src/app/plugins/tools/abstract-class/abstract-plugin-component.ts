export abstract class AbstractPluginComponent<T> {
  settings: T;

  abstract initEmptySettings(): void;

  abstract refreshView(): void;

  initializeSettings(settings: {}, isFromDatabase: boolean): void {
    this.settings = settings as T;
    if (!isFromDatabase) {
      this.initEmptySettings();
    }
  }
}
