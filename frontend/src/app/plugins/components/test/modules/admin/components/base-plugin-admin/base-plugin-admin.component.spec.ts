import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePluginAdminComponent } from './base-plugin-admin.component';

describe('BasePluginAdminComponent', () => {
  let component: BasePluginAdminComponent;
  let fixture: ComponentFixture<BasePluginAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePluginAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePluginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
