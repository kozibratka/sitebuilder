import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {SymfonyApiClientService} from '../../core/services/api/symfony-api/symfony-api-client.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {TokenInterface} from '../../core/services/api/interfaces/token-interface';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {

  constructor(
    private symfonyApiClient: SymfonyApiClientService,
    private userService: UserService,
  ) {
  }

  tryLogin(username: string, password: string): Observable<HttpResponse<TokenInterface>> {
    return this.symfonyApiClient.refreshToken(username, password).pipe(switchMap(value => {
      return this.symfonyApiClient.get<string[]>('role_list')
        .pipe(
          tap(x => {this.userService.roles = x.body;}),
          map(value1 => value)
        );
    }));
  }

  isLoggedIn(): boolean | null {
    const decoded = this.decodeAccessToken(this.symfonyApiClient.token);
    if (!decoded) {
      return null;
    }
    if (new Date(decoded.exp * 1000) < new Date()) {
      return false;
    }
    return true;
  }

  logout(): void {
    this.symfonyApiClient.token = '';
  }

  decodeAccessToken(token: string): {exp: number} {
    try {
      return jwtDecode(token) as any;
    } catch (Error) {
      return null;
    }
  }
}
