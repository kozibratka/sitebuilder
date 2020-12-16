import {Injectable} from '@angular/core';
import {ProgressBarModule} from '../progress-bar.module';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: ProgressBarModule
})
export class ProgressStatusService {

  private _statusChanger$ = new Subject<boolean>();

  constructor() {
  }

  changeStatus(displayProgressBar: boolean): void {
    this._statusChanger$.next(displayProgressBar);
  }


  get statusChanger$(): Subject<boolean> {
    return this._statusChanger$;
  }

  set statusChanger$(value: Subject<boolean>) {
    this._statusChanger$ = value;
  }
}
