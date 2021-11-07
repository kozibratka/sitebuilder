import { TestBed } from '@angular/core/testing';

import { PageListResolverService } from './page-list-resolver.service';

describe('PageListResolverService', () => {
  let service: PageListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
