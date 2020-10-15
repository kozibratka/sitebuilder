import { TestBed } from '@angular/core/testing';

import { JqueryVersionService } from './jquery-version.service';

describe('JqueryVersionService', () => {
  let service: JqueryVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JqueryVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
