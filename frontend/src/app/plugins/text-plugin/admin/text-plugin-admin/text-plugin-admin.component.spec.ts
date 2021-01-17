import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextPluginAdminComponent } from './text-plugin-admin.component';

describe('TextSettingsComponent', () => {
  let component: TextPluginAdminComponent;
  let fixture: ComponentFixture<TextPluginAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPluginAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPluginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
