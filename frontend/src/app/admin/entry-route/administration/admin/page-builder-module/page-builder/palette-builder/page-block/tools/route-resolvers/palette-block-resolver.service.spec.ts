import { TestBed } from '@angular/core/testing';

import { PageBlockResolverService } from './page-block-resolver.service';

describe('PaletteBlockResolverService', () => {
  let service: PageBlockResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageBlockResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
