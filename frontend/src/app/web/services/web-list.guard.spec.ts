import { TestBed } from '@angular/core/testing';

import { WebListResolverGuard } from './web-list-resolver.service';

describe('WebListGuard', () => {
  let guard: WebListResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WebListResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
