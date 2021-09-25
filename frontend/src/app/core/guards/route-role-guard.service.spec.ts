import { TestBed } from '@angular/core/testing';

import { RouteRoleGuardService } from './route-role-guard.service';

describe('RouteRoleGuardService', () => {
  let service: RouteRoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteRoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
