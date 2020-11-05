import { TestBed } from '@angular/core/testing';

import { LoginClientService } from './login-client.service';

describe('LoginClientService', () => {
  let service: LoginClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
