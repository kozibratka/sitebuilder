import { TestBed } from '@angular/core/testing';

import { RoutesInterceptor } from './routes.interceptor';

describe('RoutesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoutesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RoutesInterceptor = TestBed.inject(RoutesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
