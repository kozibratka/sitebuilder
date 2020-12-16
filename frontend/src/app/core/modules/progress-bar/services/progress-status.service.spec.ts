import { TestBed } from '@angular/core/testing';

import { ProgressStatusService } from './progress-status.service';

describe('ProgressStatusService', () => {
  let service: ProgressStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
