import { TestBed } from '@angular/core/testing';

import { EventEmitterService } from './event-emitter-service';

describe('ComponentComunicatorService', () => {
  let service: EventEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
