import { TestBed } from '@angular/core/testing';

import { WebDetailResolverService } from './web-detail-resolver.service';

describe('WebDetailResolverService', () => {
  let service: WebDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
