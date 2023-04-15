import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextV1Component } from './text-v1.component';

describe('TextPluginComponent', () => {
  let component: TextV1Component;
  let fixture: ComponentFixture<TextV1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
