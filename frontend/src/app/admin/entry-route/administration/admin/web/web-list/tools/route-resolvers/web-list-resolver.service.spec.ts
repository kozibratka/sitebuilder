import { TestBed } from '@angular/core/testing';

import { WebResolverService } from './web-list-resolver.service';

describe('WebResolverService', () => {
  let service: WebResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
