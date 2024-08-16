import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor() { }

  isPreviewHostname(): boolean {
    let hostName = window.location.hostname;
    return this.getPreviewHostname() === hostName;
  }

  getPreviewHostname(): string {
    let hostName = environment.hostname.split('.');
    hostName.shift();
    hostName.unshift(environment.previewSubdomain);
    return hostName.join('.');
  }
}
