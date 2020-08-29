import { TestBed } from '@angular/core/testing';

import { MenuPluginResolverMessengerService } from './menu-plugin-resolver-messenger.service';

describe('MenuPluginResolverService', () => {
  let service: MenuPluginResolverMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPluginResolverMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
