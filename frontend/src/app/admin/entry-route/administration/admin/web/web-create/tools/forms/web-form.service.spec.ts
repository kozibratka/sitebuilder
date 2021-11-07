import { TestBed } from '@angular/core/testing';

import { WebFormService } from './web-form.service';

describe('WebFormService', () => {
  let service: WebFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
