import { TestBed } from '@angular/core/testing';

import { PageBuilderBlockResolverService } from './page-builder-block-resolver.service';

describe('PageBuilderBlockResolverService', () => {
  let service: PageBuilderBlockResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageBuilderBlockResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
