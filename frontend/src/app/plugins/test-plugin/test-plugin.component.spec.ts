import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPluginComponent } from './test-plugin.component';

describe('TestComponent', () => {
  let component: TestPluginComponent;
  let fixture: ComponentFixture<TestPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
