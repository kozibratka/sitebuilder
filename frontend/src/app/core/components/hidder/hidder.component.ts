import {ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {EventEmitterService} from '../../services/event-emitter-service';

@Component({
  selector: 'app-hidder',
  templateUrl: './hidder.component.html',
  styleUrls: ['./hidder.component.css']
})
export class HidderComponent implements OnInit, OnDestroy {

  display = 'none';
  @Input() showOn: string;
  @Input() hideOn: string;
  callback = this.changeStatus.bind(this);

  constructor(
    private asyncComunicatorService: EventEmitterService<boolean>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.asyncComunicatorService.registerCallback([this.showOn, this.hideOn], this.callback);
  }

  changeStatus(eventName: string, asyncPost: boolean): void {
    if (eventName === this.showOn) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
    this.cd.detectChanges();

  }

  ngOnDestroy(): void {
    this.asyncComunicatorService.unregisterCallback([this.showOn, this.hideOn], this.callback);
  }
}
