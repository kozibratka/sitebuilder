/// <reference types="@angular/localize" />

import {bootstrapApplication} from "@angular/platform-browser";
import {appConfigWebsite} from "./app.config.website";
import {WebsiteComponent} from "./components/website/website.component";

bootstrapApplication(WebsiteComponent, appConfigWebsite)
  .catch((err) => console.error(err));
