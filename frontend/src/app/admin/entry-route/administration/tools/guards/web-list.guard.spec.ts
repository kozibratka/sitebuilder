import { TestBed } from '@angular/core/testing';

import { WebListGuard } from './web-list.guard';

describe('WebListGuard', () => {
  let guard: WebListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WebListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
