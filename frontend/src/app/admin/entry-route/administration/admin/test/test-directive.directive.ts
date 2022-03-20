import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appKokos]'
})
export class TestDirectiveDirective {

  @HostBinding('style.color') color = 'red';

  constructor() { }

}
