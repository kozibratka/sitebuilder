import { TestBed } from '@angular/core/testing';

import { SymfonyApiClientService } from './symfony-api-client.service';

describe('SymfonyApiClientService', () => {
  let service: SymfonyApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymfonyApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
