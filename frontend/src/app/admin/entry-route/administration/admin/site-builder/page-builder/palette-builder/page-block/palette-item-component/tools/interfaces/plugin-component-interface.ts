import {NavigationExtras} from '@angular/router';

export interface PluginComponentInterface {
  getLink(): {commands: any[], extras?: NavigationExtras};
  initializeSettings(settings: {}, isFromDatabase: boolean): void;
}
