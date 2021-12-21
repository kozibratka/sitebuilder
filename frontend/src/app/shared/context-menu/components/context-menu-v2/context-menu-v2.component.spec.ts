import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuV2Component } from './context-menu-v2.component';

describe('ContextMenuV2Component', () => {
  let component: ContextMenuV2Component;
  let fixture: ComponentFixture<ContextMenuV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextMenuV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
