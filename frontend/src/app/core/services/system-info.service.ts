import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor() { }

  isPreviewHostname(): boolean {
    let hostName = window.location.hostname.split('.');
    if (hostName.length >= 2) {
      return hostName[0] == environment.previewSubdomain && hostName[1] == environment.hostname.split('.')[0];
    }
    return false;
  }

  getPreviewHostname(): string {
    return environment.previewSubdomain+'.'+environment.hostname;
  }
}
