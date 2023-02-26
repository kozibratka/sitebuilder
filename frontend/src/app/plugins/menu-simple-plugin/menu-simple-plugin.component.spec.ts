import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSimplePluginComponent } from './menu-simple-plugin.component';

describe('MenuSimplePluginComponent', () => {
  let component: MenuSimplePluginComponent;
  let fixture: ComponentFixture<MenuSimplePluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSimplePluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSimplePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
