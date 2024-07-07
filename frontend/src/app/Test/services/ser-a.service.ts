import { Injectable } from '@angular/core';
import {SerBService} from "./ser-b.service";

@Injectable()
export class SerAService {

  constructor(
    private serB: SerBService
  ) { }

  lol() {
    console.log('ddddd');
  }
}
