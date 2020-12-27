import { TestBed } from '@angular/core/testing';

import { PageDetailResolverService } from './page-detail-resolver.service';

describe('PageDetailResolverService', () => {
  let service: PageDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
