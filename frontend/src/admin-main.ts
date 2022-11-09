import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {AppAdminModule} from './app/app-admin.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppAdminModule).then((moduleRef) => {

  }
)
  .catch(err => console.error(err));
