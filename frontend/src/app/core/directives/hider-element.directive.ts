import {Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from '../services/event-emitter-service';

@Directive({
  selector: '[appHiderElement]'
})
export class HiderElementDirective implements OnInit, OnDestroy{

  @Input('appHiderElement') uniqeId: string;
  @HostBinding('style.display') display = 'none';

  constructor(
    private asyncComunicatorService: EventEmitterService<boolean>
  ) {
  }

  ngOnInit(): void {
    this.asyncComunicatorService.registerCallback(this.uniqeId, this.changeStatus.bind(this));
  }

  changeStatus(asyncPost: boolean): void {
    if (asyncPost) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  ngOnDestroy(): void {
    this.asyncComunicatorService.unregisterCallback(this.uniqeId, this.changeStatus.bind(this));
  }

}
