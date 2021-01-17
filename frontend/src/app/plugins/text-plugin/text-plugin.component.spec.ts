import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextPluginComponent } from './text-plugin.component';

describe('TextPluginComponent', () => {
  let component: TextPluginComponent;
  let fixture: ComponentFixture<TextPluginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
