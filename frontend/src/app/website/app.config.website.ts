import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {provideRouter} from "@angular/router";
import {websiteRoute} from "./route";
import {provideHttpClient} from "@angular/common/http";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

export const appConfigWebsite: ApplicationConfig = {
  providers: [
    provideRouter(websiteRoute),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(FontAwesomeModule),
  ]
};
