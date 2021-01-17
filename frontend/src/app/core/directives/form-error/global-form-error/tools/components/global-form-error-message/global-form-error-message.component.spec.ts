import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GlobalFormErrorMessageComponent } from './global-form-error-message.component';

describe('GlobalFormErrorMessageComponent', () => {
  let component: GlobalFormErrorMessageComponent;
  let fixture: ComponentFixture<GlobalFormErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalFormErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFormErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
