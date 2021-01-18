import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFormErrorComponent } from './global-form-error.component';

describe('GlobalFormErrorComponent', () => {
  let component: GlobalFormErrorComponent;
  let fixture: ComponentFixture<GlobalFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalFormErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
