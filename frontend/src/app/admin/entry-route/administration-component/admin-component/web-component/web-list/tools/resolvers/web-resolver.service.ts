import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';

@Injectable({
  providedIn: 'root'
})
export class WebResolverService implements Resolve<WebInterface[] | WebInterface>{

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WebInterface[] | WebInterface> | Promise<WebInterface[] | WebInterface> | WebInterface[] | WebInterface {

  }
}
