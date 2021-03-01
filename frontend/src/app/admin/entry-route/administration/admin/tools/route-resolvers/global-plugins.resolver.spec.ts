import { TestBed } from '@angular/core/testing';

import { GlobalPluginsResolver } from './global-plugins.resolver';

describe('GlobalPluginsResolver', () => {
  let resolver: GlobalPluginsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GlobalPluginsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
