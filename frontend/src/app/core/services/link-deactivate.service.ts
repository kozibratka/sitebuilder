import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkDeactivateService {

  deactivate = false;
  constructor() { }
}
