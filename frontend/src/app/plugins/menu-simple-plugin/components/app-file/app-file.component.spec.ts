import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFileComponent } from './app-file.component';

describe('AppFileComponent', () => {
  let component: AppFileComponent;
  let fixture: ComponentFixture<AppFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
