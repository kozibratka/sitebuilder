import { TestBed } from '@angular/core/testing';

import { HttpResponseToasterService } from './http-response-toaster.service';

describe('HttpResponseToasterService', () => {
  let service: HttpResponseToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpResponseToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
