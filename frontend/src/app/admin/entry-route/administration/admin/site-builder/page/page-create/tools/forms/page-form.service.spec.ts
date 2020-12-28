import { TestBed } from '@angular/core/testing';

import { PageFormService } from './page-form.service';

describe('PageFormService', () => {
  let service: PageFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
