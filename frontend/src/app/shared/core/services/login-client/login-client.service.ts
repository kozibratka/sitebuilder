import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {SymfonyApiClientService} from '../symfony-api/symfony-api-client.service';
import {tap} from 'rxjs/operators';
import {TokenInterface} from '../../interfaces/token-interface';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {CoreModule} from '../../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LoginClientService {

  constructor(
    private symfonyApiClient: SymfonyApiClientService,
  ) {
  }

  tryLogin(username: string, password: string): Observable<HttpResponse<TokenInterface>> {
    return this.symfonyApiClient.refreshToken(username, password);
  }

  isLoggedIn(): boolean | null {
    const decoded = this.decodeAccessToken(this.symfonyApiClient.token);
    if (!decoded) {
      return null;
    }
    if (new Date(decoded.exp * 1000) < new Date()) {
      return false;
    }
  }

  logout(): void {
    this.symfonyApiClient.token = '';
  }

  decodeAccessToken(token: string): {exp: number} {
    try {
      return jwt_decode(token) as any;
    } catch (Error) {
      return null;
    }
  }
}
