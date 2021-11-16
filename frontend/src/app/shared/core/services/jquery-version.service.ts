import { Injectable } from '@angular/core';

@Injectable()
export class JqueryVersionService {

  jqueryFromAssets: JQueryStatic;

  constructor() {
    const originJquery = $;
    while ($) {
      this.jqueryFromAssets = $;
      $.noConflict();
    }
    ($ as any) = originJquery;
  }
}
