import { Injectable } from '@angular/core';
import {CoreModule} from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class FlashDataService<T> {

  private flashData: Map<string, T> = new Map<string, T>();

  constructor() { }

  add(name: string, data: T): void
  {
    this.flashData.set(name, data);
  }

  get(name: string): T
  {
    const data = this.flashData.get(name);
    this.flashData.delete(name);
    return data;
  }
}
