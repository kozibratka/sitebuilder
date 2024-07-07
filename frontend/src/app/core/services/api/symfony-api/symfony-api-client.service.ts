import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject, throwError} from 'rxjs';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import Routing from '../../../external-library/router';
import {TokenInterface} from '../interfaces/token-interface';
import {EventEmitterService} from '../../event-emitter-service';
import {Event} from './tools/constants/event';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymfonyApiClientService {

  private status: 'none' | 'inProgress' | 'done' = 'none';
  private urlFetchNotification$ = new Subject<object>();
  private counterRequest = {post: 0, get: 0, all: 0};

  constructor(
    private httpClient: HttpClient,
    private eventEmitterService: EventEmitterService
  ) {
  }

  private downloadRoutes(): Observable<object> {
    return of(1).pipe(
      tap(value => this.status = 'inProgress'),
      switchMap(() => {
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
      )
    );
  }

  get<T = {}>(routeName: string, querySegmentParam?: {}, headersOptions: { [header: string]: string } = {}): Observable<HttpResponse<T>> {
    const routesFromBackend$ = this.tryGetRoutes('get');
    return routesFromBackend$.pipe(
      switchMap(routes => {
        Routing.setRoutingData(routes);
        const path = Routing.generate(routeName, querySegmentParam);
        // if (querySegmentParam) {
        //   querySegmentParam.forEach(value => {
        //     path += '/' + value;
        //   });
        // }
        return this.httpClient.get<T>(environment.backendUrl + path, {
          observe: 'response',
          headers: this.prepareHeader(headersOptions)
        }).pipe(
          finalize(this.generatePostSendCallbacks('post'))
        );
      })
    );
  }

  post<T = any>(routeName: string, data, querySegmentParam?: {}, headersOptions: { [header: string]: string } = {}, requestOptions = {}): Observable<HttpResponse<T>> {
    const routesFromBackend$ = this.tryGetRoutes('post');
    return routesFromBackend$.pipe(
      switchMap(routes => {
        Routing.setRoutingData(routes);
        const path = Routing.generate(routeName, querySegmentParam);
        // if (querySegmentParam) {
        //   querySegmentParam.forEach(value => {
        //     path += '/' + value;
        //   });
        // }
        return this.httpClient.post<T>(environment.backendUrl + path, data, {
          observe: 'response',
          ...requestOptions,
          headers: this.prepareHeader(headersOptions)
        }).pipe(
          finalize(this.generatePostSendCallbacks('post'))
        );
      })
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
      headersOptions['Authorization'] = 'Bearer ' + this.token;
    }
    return headersOptions;
  }


  get token(): string {
    return localStorage.getItem('token');
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  private tryGetRoutes(type): Observable<object> {
    let routesFromBackend$: Observable<object>;
    routesFromBackend$ = new Observable<object>(subscriber => {
      this.emitPreSend(type);
      if (this.status === 'done' || this.status === 'none') {
        this.downloadRoutes().subscribe(value => subscriber.next(value));
      } else {
        const unsubscribe = this.urlFetchNotification$.subscribe(downloadedRoutes => {
          unsubscribe.unsubscribe();
          subscriber.next(downloadedRoutes);
        });
      }
    });

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

  emitPreSend(type: 'get' | 'post'): void {
    if (type === 'get') {
      ++this.counterRequest.get;
      this.eventEmitterService.emit(Event.PRE_SEND_GET, true);
    } else {
      ++this.counterRequest.post;
      this.eventEmitterService.emit(Event.PRE_SEND_POST, true);
    }
    ++this.counterRequest.all;
    this.eventEmitterService.emit(Event.PRE_SEND, true);
  }

  generatePostSendCallbacks(type: 'get' | 'post'): (err?: any) => void {
    return () => {
      setTimeout(() => {
        if (type === 'get') {
          --this.counterRequest.get;
          if (!this.counterRequest.get) {
            this.eventEmitterService.emit(Event.POST_SEND_GET, false);
          }
        } else {
          --this.counterRequest.post;
          if (!this.counterRequest.post) {
            this.eventEmitterService.emit(Event.POST_SEND_POST, false);
          }
        }
        --this.counterRequest.all;
        if (!this.counterRequest.all) {
          this.eventEmitterService.emit(Event.POST_SEND, false);
        }
      }, 0);
    };
  }
}
