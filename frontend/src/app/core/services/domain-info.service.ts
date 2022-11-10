import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DomainInfoService {

  constructor() { }

  isLocalhost(): boolean {
    return window.location.hostname === 'localhost';
  }

  isPreviewHostname(): boolean {
    return this.isLocalhost() || environment.hostname.replace('www', environment.previewSubdomain) === window.location.hostname;
  }

  getPreviewHostname(): string {
    return this.isLocalhost()
      ? 'http://localhost:' + environment.localhostPreviewPort : environment.hostname.replace('www', environment.previewSubdomain);
  }
}
