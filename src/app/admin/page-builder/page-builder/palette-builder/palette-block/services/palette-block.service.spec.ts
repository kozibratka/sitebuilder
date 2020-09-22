import { TestBed } from '@angular/core/testing';

import { PaletteBlockService } from './palette-block.service';

describe('PaletteBlockService', () => {
  let service: PaletteBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletteBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
