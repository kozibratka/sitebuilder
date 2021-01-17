import { TestBed } from '@angular/core/testing';

import { TextPluginFormService } from './text-plugin-form.service';

describe('TextPluginFormService', () => {
  let service: TextPluginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextPluginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
