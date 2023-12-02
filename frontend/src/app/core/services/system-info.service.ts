import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SystemInfoService {

  constructor() { }

  isLocalhost(): boolean {
    return window.location.hostname === 'localhost';
  }

  isPreviewHostname(): boolean {
    return this.getLocalhostWithPortForPreview() === location.host ||
      environment.hostname.replace('www', environment.previewSubdomain) === window.location.hostname;
  }

  getPreviewHostname(): string {
    return this.isLocalhost()
      ? this.getLocalhostWithPortForPreview() : environment.hostname.replace('www', environment.previewSubdomain);
  }

  getLocalhostWithPortForPreview(): string {
    return 'localhost:' + environment.localhostPreviewPort;
  }

  isSitebuilderDomain(): boolean {
    return this.isLocalhost() || environment.hostname === window.location.hostname;
  }

  isAdminRoute(): boolean {
    return this.isSitebuilderDomain() && window.location.pathname.startsWith('admin');
  }
}
