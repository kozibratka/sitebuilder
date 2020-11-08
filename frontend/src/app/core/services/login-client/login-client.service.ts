import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {SymfonyApiClientService} from '../symfony-api/symfony-api-client.service';
import {catchError, tap} from 'rxjs/operators';
import {TokenInterface} from '../../interfaces/token-interface';
import {HttpResponseToasterService} from '../http-response-toaster.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {

  private _decodedToken: {exp: number} = null;

  constructor(
    private symfonyApiClient: SymfonyApiClientService,
    private httpResponseToasterService: HttpResponseToasterService
  ) {
  }


  get decodedToken(): { exp: number } {
    return this._decodedToken;
  }

  set decodedToken(value: { exp: number }) {
    this._decodedToken = value;
  }

  tryLogin(username: string, password: string): Observable<TokenInterface> {
    return this.symfonyApiClient.refreshToken(username, password).pipe(
      tap(
        token => {
          this.decodeAccessToken(token);
        },
        error => this.httpResponseToasterService.showError(error)
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
