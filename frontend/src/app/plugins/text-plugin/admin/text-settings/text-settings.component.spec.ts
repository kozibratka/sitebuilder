import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSettingsComponent } from './text-settings.component';

describe('TextSettingsComponent', () => {
  let component: TextSettingsComponent;
  let fixture: ComponentFixture<TextSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
