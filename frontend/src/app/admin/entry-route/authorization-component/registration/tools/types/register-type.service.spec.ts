import { TestBed } from '@angular/core/testing';

import { RegisterTypeService } from './register-type.service';

describe('RegisterTypeService', () => {
  let service: RegisterTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
