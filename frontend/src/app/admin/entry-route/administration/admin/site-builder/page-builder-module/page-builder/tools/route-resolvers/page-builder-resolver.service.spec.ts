import { TestBed } from '@angular/core/testing';

import { PageBuilderResolverService } from './page-builder-resolver.service';

describe('PaletteBlockResolverService', () => {
  let service: PageBuilderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageBuilderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
