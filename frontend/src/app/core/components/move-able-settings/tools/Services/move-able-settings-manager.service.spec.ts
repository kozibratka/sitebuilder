import { TestBed } from '@angular/core/testing';

import { MoveAbleSettingsManagerService } from './move-able-settings-manager.service';

describe('MoveAbleSettingsManagerService', () => {
  let service: MoveAbleSettingsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveAbleSettingsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
