import {ApplicationConfig, importProvidersFrom, InjectionToken} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import { SortablejsModule } from 'nxt-sortablejs';
import {provideAnimations} from "@angular/platform-browser/animations";
import {PluginsProvider} from "./plugins/shared/constants/PluginProvider";
import {DragToSelectModule} from "ngx-drag-to-select";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {ColorPickerModule} from "ngx-color-picker";

export const ADMIN_CONFIG = new InjectionToken<{}>('admin info');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(SortablejsModule.forRoot({ animation: 150 })),
    importProvidersFrom(DragToSelectModule.forRoot()),
    importProvidersFrom(FontAwesomeModule),
    importProvidersFrom(SocialLoginModule),
    importProvidersFrom(ColorPickerModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '923543574323-vpos32ti6erndrilgnofmjcq98oq1k2g.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1070524357823190')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    PluginsProvider,
    {provide: ADMIN_CONFIG, useValue: {}}
  ]
};

