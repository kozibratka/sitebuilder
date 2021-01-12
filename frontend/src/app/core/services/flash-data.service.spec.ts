import { TestBed } from '@angular/core/testing';

import { FlashDataService } from './flash-data.service';

describe('FlashDataService', () => {
  let service: FlashDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
