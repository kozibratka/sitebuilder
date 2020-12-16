import {Directive, HostBinding} from '@angular/core';
import {ProgressStatusService} from '../services/progress-status.service';

@Directive({
  selector: '[appProgresBar]'
})
export class ProgresBarDirective {

  @HostBinding('style.display') display = 'none';

  constructor(private progressStatusService: ProgressStatusService) {
    progressStatusService.statusChanger$.subscribe(status => {
      this.changeStatus(status);
    });
  }

  changeStatus(displayProgressBar: boolean): void {
    if (displayProgressBar) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

}
