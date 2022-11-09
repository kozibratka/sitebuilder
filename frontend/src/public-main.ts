import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {PublicModule} from './app/public/public.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PublicModule).then((moduleRef) => {

  }
)
  .catch(err => console.error(err));
