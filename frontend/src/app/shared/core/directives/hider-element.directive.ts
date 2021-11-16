import {Directive, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from '../services/event-emitter-service';

@Directive({
  selector: '[appHiderElement]'
})
export class HiderElementDirective implements OnInit, OnDestroy{

  @Input() showOn: string;
  @Input() hideOn: string;
  @HostBinding('style.display') display = 'none';
  callback = this.changeStatus.bind(this);

  constructor(
    private asyncComunicatorService: EventEmitterService<boolean>
  ) {

  }

  ngOnInit(): void {
    this.asyncComunicatorService.registerCallback([this.showOn, this.hideOn], this.callback);
  }

  changeStatus(eventName: string, asyncPost: boolean): void {
    if (eventName === this.showOn) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  ngOnDestroy(): void {
    this.asyncComunicatorService.unregisterCallback([this.showOn, this.hideOn], this.callback);
  }

}
