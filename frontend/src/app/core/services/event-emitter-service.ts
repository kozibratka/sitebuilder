import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable()
export class EventEmitterService<T = unknown> {

  private subjectComunicators: Map<string, Subject<T>> = new Map<string, Subject<T>>();
  private subscriptions = new Map<string, Map<(status: T) => void, Subscription>>();

  constructor() {
  }

  emit(eventName: string, data: T): void {
    const subject$ = this.subjectComunicators.get(eventName);
    if (subject$ !== undefined) {
      subject$.next(data);
    }
  }

  registerCallback(eventName: string, callback: (status: T) => void): void {
    let subject$ = this.subjectComunicators.get(eventName);
    if (subject$ === undefined) {
      this.subjectComunicators.set(eventName, new Subject<T>());
      subject$ = this.subjectComunicators.get(eventName);
      this.subscriptions.set(eventName, new Map<(status: T) => void, Subscription>());
    }
    const subscription = subject$.subscribe(callback);
    this.subscriptions.get(eventName).set(callback, subscription);
  }

  unregisterCallback(eventName: string, callback: (status: T) => void): void {
    this.subscriptions.get(eventName)?.get(callback)?.unsubscribe();
    this.subscriptions.get(eventName)?.delete(callback);
    if(!this.subscriptions.get(eventName)?.size){
      this.subscriptions.delete(eventName);
      this.subjectComunicators.delete(eventName);
    }
  }
}
