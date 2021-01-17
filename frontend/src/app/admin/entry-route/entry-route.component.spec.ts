import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntryRouteComponent } from './entry-route.component';

describe('EntryRouteComponent', () => {
  let component: EntryRouteComponent;
  let fixture: ComponentFixture<EntryRouteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
