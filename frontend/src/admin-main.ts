/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppAdminComponent } from './app/app-admin.component';

bootstrapApplication(AppAdminComponent, appConfig)
  .catch((err) => console.error(err));
