import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class RoutesCacheInterceptor implements HttpInterceptor {

  private cache = new Map<HttpRequest<any>, HttpResponse<string>>();

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('fetchroutes')) {
      return next.handle(request);
    }
    const cachedResponse = this.cache.get(request);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(request).pipe(tap(response => {
      if (response.type !== HttpEventType.Response) {
        return;
      }
      this.cache.set(request, response);
    }));
  }
}
