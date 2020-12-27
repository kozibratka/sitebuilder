import { TestBed } from '@angular/core/testing';

import { PaletteBlockResolverService } from './palette-block-resolver.service';

describe('PaletteBlockResolverService', () => {
  let service: PaletteBlockResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletteBlockResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
