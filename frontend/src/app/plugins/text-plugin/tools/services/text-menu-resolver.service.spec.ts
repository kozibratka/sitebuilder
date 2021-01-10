import { TestBed } from '@angular/core/testing';

import { TextMenuResolverService } from './text-menu-resolver.service';

describe('TextMenuResolverService', () => {
  let service: TextMenuResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextMenuResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
