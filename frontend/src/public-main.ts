/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfigPublic } from './app/app.config';
import {AppPublicComponent} from "./app/public/app-public.component";

bootstrapApplication(AppPublicComponent, appConfigPublic)
  .catch((err) => console.error(err));
