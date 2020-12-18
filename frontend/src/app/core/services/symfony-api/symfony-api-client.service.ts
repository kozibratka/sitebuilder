import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import Routing from '../../external-library/router';
import {TokenInterface} from '../../interfaces/token-interface';
import {EventEmitterService} from '../event-emitter-service';
import {Event} from './tools/constants/event';


@Injectable({
  providedIn: 'root'
})
export class SymfonyApiClientService {

  private status: 'none' | 'inProgress' | 'done' = 'none';
  private urlFetchNotification$ = new Subject<object>();

  constructor(
    private httpClient: HttpClient,
    private eventEmitterService: EventEmitterService
  ) {
  }

  private downloadRoutes(): Observable<object> {
    this.status = 'inProgress';
    return this.httpClient.get(environment.backendUrl + environment.backendRoutesPath,
      {
        responseType: 'json', headers: {fetchRoutes: 'true'}
      }).pipe(
      catchError(this.handleErrorRoute.bind(this)),
      tap(response => {
        this.status = 'done';
        this.urlFetchNotification$.next(response);
      }));
  }

  get<T = {}>(routeName: string, querySegmentParam?: string[], headersOptions: { [header: string]: string } = {}): Observable<HttpResponse<T>> {
    this.eventEmitterService.emit(Event.PRE_SEND_GET, true);
    this.eventEmitterService.emit(Event.PRE_SEND, true);
    const routesFromBackend$ = this.tryGetRoutes();
    return routesFromBackend$.pipe(
      switchMap(routes => {
        Routing.setRoutingData(routes);
        let path = Routing.generate(routeName);
        if (querySegmentParam) {
          querySegmentParam.forEach(value => {
            path += '/' + value;
          });
        }
        return this.httpClient.get<T>(environment.backendUrl + path, {
          observe: 'response',
          headers: this.prepareHeader(headersOptions)
        });
      }), tap(
        {
          error: err => this.eventEmitterService.emit(Event.POST_SEND_GET, false),
          complete: () => this.eventEmitterService.emit(Event.POST_SEND_GET, false)
        }
      ), tap(
        {
          error: err => this.eventEmitterService.emit(Event.POST_SEND, false),
          complete: () => this.eventEmitterService.emit(Event.POST_SEND, false)
        }
      )
    );
  }

  post<T>(routeName: string, data, headersOptions: { [header: string]: string } = {}): Observable<HttpResponse<T>> {
    this.eventEmitterService.emit(Event.PRE_SEND_POST, true);
    this.eventEmitterService.emit(Event.PRE_SEND, true);
    const routesFromBackend$ = this.tryGetRoutes();
    return routesFromBackend$.pipe(
      switchMap(routes => {
        Routing.setRoutingData(routes);
        const path = Routing.generate(routeName);
        return this.httpClient.post<T>(environment.backendUrl + path, data, {
          observe: 'response',
          headers: this.prepareHeader(headersOptions)
        });
      }), tap(
        {
          error: err => this.eventEmitterService.emit(Event.POST_SEND_POST, false),
          complete: () => this.eventEmitterService.emit(Event.POST_SEND_POST, false)
        }
      ), tap(
        {
          error: err => this.eventEmitterService.emit(Event.POST_SEND, false),
          complete: () => this.eventEmitterService.emit(Event.POST_SEND, false)
        }
      )
    );
  }

  refreshToken(username: string, passwordText: string): Observable<HttpResponse<TokenInterface>> {
    return this.post<TokenInterface>('token_create', {email: username, password: passwordText})
      .pipe(tap((httpResponse) => {
        this.token = httpResponse.body.token;
      }));
  }

  private prepareHeader(headersOptions: { [header: string]: string } = {}): { [header: string]: string } {
    if (this.token) {
      headersOptions.Authorization = 'Bearer ' + this.token;
    }
    return headersOptions;
  }


  get token(): string {
    return localStorage.getItem('token');
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  private tryGetRoutes(): Observable<object> {
    let routesFromBackend$: Observable<object>;
    switch (this.status) {
      case 'done':
      case 'none':
        routesFromBackend$ = this.downloadRoutes();
        break;
      default:
        routesFromBackend$ = new Observable<object>(subscriber => {
          this.urlFetchNotification$.subscribe(downloadedRoutes => {
            subscriber.next(downloadedRoutes);
          });
        });
        break;
    }
    return routesFromBackend$;
  }

  handleErrorRoute(error: HttpErrorResponse): Observable<never> {
    let completedMessage = '';
    this.status = 'none';
    if (error.error instanceof ErrorEvent) {
      completedMessage = 'Nepodařilo se kontaktovat server pro získání routy. Zkontrolujte stav vašeho připojení.';
    } else {
      completedMessage = 'Došlo k chybě při získání routy na server. Opakute akci později. Kód chyby: ' + error.status;
    }

    return throwError(completedMessage);
  }
}
