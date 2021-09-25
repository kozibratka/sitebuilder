import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {WebInterface} from '../interfaces/web-interface';
import {WebListGuard} from '../guards/web-list.guard';

@Injectable({
  providedIn: 'root'
})
export class WebListResolverService implements Resolve<WebInterface[]> {

  webList: WebInterface[];

  constructor(
    private webListGuard: WebListGuard
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): WebInterface[] {
    return this.webListGuard.webList;
  }
}
