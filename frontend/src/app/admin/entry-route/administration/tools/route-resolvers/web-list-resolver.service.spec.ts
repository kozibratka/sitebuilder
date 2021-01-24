import { TestBed } from '@angular/core/testing';
import {WebListResolverService} from './web-list-resolver.service';



describe('WebResolverService', () => {
  let service: WebListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
