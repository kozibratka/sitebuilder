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
      this.createNewSubject(eventName);
      subject$ = this.subjectComunicators.get(eventName);
    }
    const subscription = subject$.subscribe(callback);
    const weakMap = new Map<(status: T) => void, Subscription>();
    weakMap.set(callback, subscription);
    this.subscriptions.set(eventName, weakMap);
  }

  unregisterCallback(eventName: string, callback: (status: T) => void): void {

    let data = this.subscriptions.get(eventName);
    console.log(data);

    this.subscriptions.get(eventName)?.get(callback)?.unsubscribe();
  }

  private createNewSubject(name: string): void {
    this.subjectComunicators.set(name, new Subject<T>());
  }
}
