import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRouteComponent } from './entry-route.component';

describe('EntryRouteComponent', () => {
  let component: EntryRouteComponent;
  let fixture: ComponentFixture<EntryRouteComponent>;

  beforeEach(async(() => {
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
