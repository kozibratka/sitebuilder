import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {SymfonyApiClientService} from '../symfony-api/symfony-api-client.service';
import {catchError, tap} from 'rxjs/operators';
import {TokenInterface} from '../../interfaces/token-interface';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {

  private _decodedToken: {exp: number} = null;

  constructor(
    private symfonyApiClient: SymfonyApiClientService,
  ) {
  }


  get decodedToken(): { exp: number } {
    return this._decodedToken;
  }

  set decodedToken(value: { exp: number }) {
    this._decodedToken = value;
  }

  tryLogin(username: string, password: string): Observable<HttpResponse<TokenInterface>> {
    return this.symfonyApiClient.refreshToken(username, password).pipe(
      tap(
        httpResponse => {
          this.decodeAccessToken(httpResponse.body);
        }
      ),
    );
  }

  isLoggedIn(): boolean {
    if (!this._decodedToken) {
      return false;
    }
    if (new Date(this._decodedToken.exp * 1000) < new Date()) {
      return false;
    }
  }

  decodeAccessToken(token: TokenInterface): unknown {
    try {
      this.decodedToken = jwt_decode(token.token) as any;
    } catch (Error) {
      return null;
    }
  }
}
