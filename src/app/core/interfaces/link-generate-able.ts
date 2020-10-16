import {NavigationExtras} from '@angular/router';

export interface LinkGenerateAble {
  getLink(): {commands: any[], extras?: NavigationExtras};
}
