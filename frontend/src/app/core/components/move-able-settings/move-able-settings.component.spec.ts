import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveAbleSettingsComponent } from './move-able-settings.component';

describe('MoveableSettingsComponent', () => {
  let component: MoveAbleSettingsComponent;
  let fixture: ComponentFixture<MoveAbleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveAbleSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveAbleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
