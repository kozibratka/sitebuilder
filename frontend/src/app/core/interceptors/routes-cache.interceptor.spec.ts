import { TestBed } from '@angular/core/testing';

import { RoutesCacheInterceptor } from './routes-cache.interceptor';

describe('RoutesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoutesCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RoutesCacheInterceptor = TestBed.inject(RoutesCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
