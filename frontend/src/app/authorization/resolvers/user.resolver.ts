import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserInterface} from "../interfaces/user-interface";
import {map} from "rxjs/operators";
import {SymfonyApiClientService} from "../../core/services/api/symfony-api/symfony-api-client.service";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<void> {

  constructor(
    private symfonyApiClientService: SymfonyApiClientService,
    private userService: UserService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    return this.symfonyApiClientService.get<UserInterface>('user_read').pipe(map(response => {
      this.userService.settings = response.body;
    }));
  }
}
