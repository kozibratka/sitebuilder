import { TestBed } from '@angular/core/testing';

import { MenuPluginResolverService } from './menu-plugin-resolver.service';

describe('MenuPluginResolverService', () => {
  let service: MenuPluginResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPluginResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
