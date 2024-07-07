import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes, publicRoutes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import { SortablejsModule } from 'nxt-sortablejs';
import {provideAnimations} from "@angular/platform-browser/animations";
import {PluginsProvider} from "./plugins/shared/constants/PluginProvider";
import {DragToSelectModule} from "ngx-drag-to-select";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(SortablejsModule.forRoot({ animation: 150 })),
    importProvidersFrom(DragToSelectModule.forRoot()),
    importProvidersFrom(FontAwesomeModule),
    PluginsProvider,
  ]
};

export const appConfigPublic: ApplicationConfig = {
  providers: [
    provideRouter(publicRoutes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(FontAwesomeModule),
    PluginsProvider,
  ]
};

