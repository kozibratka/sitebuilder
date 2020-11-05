import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {SymfonyApiClientService} from '../symfony-api/symfony-api-client.service';
import {catchError, tap} from 'rxjs/operators';
import {TokenInterface} from '../symfony-api/interfaces/token-interface';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginClientService {

  private decodedToken: {exp: Date} = null;

  constructor(private symfonyApiClient: SymfonyApiClientService) {

  }

  tryLogin(username: string, password: string) {
    this.symfonyApiClient.refreshToken(username, password).pipe(
      catchError(this.loginErrorHandle),
      tap(token => { this.getDecodedAccessToken(token); }),
      );
  }

  isLoggedIn(): boolean {
    if (!this.decodedToken) {
      return false;
    }
    if (this.decodedToken.exp < new Date()) {
      return false;
    }
  }

  getDecodedAccessToken(token: TokenInterface): unknown {
    try {
      this.symfonyApiClient.token = jwt_decode(token.token) as any;
    } catch (Error) {
      return null;
    }
  }

  private loginErrorHandle(error: HttpErrorResponse) {
    if


    return throwError(
      'Something bad happened; please try again later.');
  }
}
