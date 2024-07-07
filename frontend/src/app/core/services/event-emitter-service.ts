import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService<T = unknown> {

  private subjectComunicators: Map<string, Subject<T>> = new Map<string, Subject<T>>();
  private subscriptions = new Map<string, Map<(eventName: string, status: T) => void, Subscription>>();

  constructor() {
  }

  emit(eventName: string, data: T): void {
    const subject$ = this.subjectComunicators.get(eventName);
    if (subject$ !== undefined) {
      subject$.next(data);
    }
  }

  registerCallback(eventNames: string | string[], callback: (eventName: string, status: T) => void): void {
    if (!Array.isArray(eventNames)){
      eventNames = [eventNames];
    }
    eventNames.forEach((eventName, index) => {
      let subject$ = this.subjectComunicators.get(eventName);
      if (subject$ === undefined) {
        this.subjectComunicators.set(eventName, new Subject<T>());
        subject$ = this.subjectComunicators.get(eventName);
        this.subscriptions.set(eventName, new Map<(eventName: string, status: T) => void, Subscription>());
      }
      const subscription = subject$.subscribe((value => {callback(eventName, value); }));
      this.subscriptions.get(eventName).set(callback, subscription);
    });
  }

  unregisterCallback(eventNames: string | string[], callback: (eventName: string, status: T) => void = null): void {
    if (!Array.isArray(eventNames)){
      eventNames = [eventNames];
    }
    eventNames.forEach((eventName, index) => {
      if (!callback) {
        this.subscriptions.get(eventName).forEach((value, key, map) => {
          value.unsubscribe();
        });
        this.subscriptions.get(eventName).clear();
      } else {
        this.subscriptions.get(eventName)?.get(callback)?.unsubscribe();
        this.subscriptions.get(eventName)?.delete(callback);
      }
      if (!this.subscriptions.get(eventName)?.size){
        this.subscriptions.delete(eventName);
        this.subjectComunicators.delete(eventName);
      }
    });
  }
}
