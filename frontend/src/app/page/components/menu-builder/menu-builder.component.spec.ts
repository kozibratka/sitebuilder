import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MenuBuilderComponent} from './menu-builder.component';

describe('MenuBuilderComponent', () => {
  let component: MenuBuilderComponent;
  let fixture: ComponentFixture<MenuBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
