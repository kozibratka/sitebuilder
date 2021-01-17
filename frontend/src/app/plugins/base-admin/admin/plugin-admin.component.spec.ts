import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PluginAdminComponent } from './plugin-admin.component';

describe('AdminComponent', () => {
  let component: PluginAdminComponent;
  let fixture: ComponentFixture<PluginAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
