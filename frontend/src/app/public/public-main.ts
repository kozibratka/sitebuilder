/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import {AppPublicComponent} from "./app-public.component";
import {appConfigPublic} from "./app.config.public";

bootstrapApplication(AppPublicComponent, appConfigPublic)
  .catch((err) => console.error(err));
