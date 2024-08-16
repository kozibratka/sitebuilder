import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {provideRouter} from "@angular/router";
import {publicRoutes} from "./route";
import {provideHttpClient} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PluginsProvider} from "../plugins/shared/constants/PluginProvider";

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
