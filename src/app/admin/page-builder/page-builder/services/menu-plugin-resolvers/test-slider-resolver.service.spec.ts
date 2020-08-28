import { TestBed } from '@angular/core/testing';

import { TestSliderResolverService } from './test-slider-resolver.service';

describe('TestSliderResolverService', () => {
  let service: TestSliderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSliderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
