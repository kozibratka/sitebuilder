import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForRouteComponent } from './modal-for-route.component';

describe('ModalForRouteComponent', () => {
  let component: ModalForRouteComponent;
  let fixture: ComponentFixture<ModalForRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
