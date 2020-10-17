import { TestBed } from '@angular/core/testing';

import { PaletteBlockGridstackService } from './palette-block-gridstack.service';

describe('PaletteBlockGridstackService', () => {
  let service: PaletteBlockGridstackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletteBlockGridstackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
