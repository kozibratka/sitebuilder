import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import Routing from './external-library/router';


@Injectable({
  providedIn: 'root'
})
export class SymfonyApiClientService {

  private status: 'none' | 'inProgress' | 'done' = 'none';
  private urlFetchNotification$ = new Subject<object>();

  constructor(private httpClient: HttpClient) {
    // this.get<object>('token_create').subscribe(value => {
    //   console.log(value);
    // });
  }

  private downloadRoutes(): Observable<object> {
    this.status = 'inProgress';
    return this.httpClient.get(environment.backendUrl + environment.backendRoutesPath,
      {responseType: 'json', headers: {fetchRoutes :  'true'}
      }).pipe(tap(response => {
        this.status = 'done';
        this.urlFetchNotification$.next(response);
    }));
  }

  get<T>(routeName: string): Observable<T> {
    let routesFromBackend$: Observable<object>;
    switch (this.status){
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
    return routesFromBackend$.pipe(
      switchMap(routes => {
        Routing.setRoutingData(routes);
        const path = Routing.generate(routeName);
        return this.httpClient.get<T>(environment.backendUrl + path);
      })
    );
  }
}
