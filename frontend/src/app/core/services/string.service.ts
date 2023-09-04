import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  static randomString(): string {
    return Math.random().toString(16).slice(2);
  }
}
