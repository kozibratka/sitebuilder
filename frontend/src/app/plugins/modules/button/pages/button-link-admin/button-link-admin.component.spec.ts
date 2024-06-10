import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinkAdminComponent } from './button-link-admin.component';

describe('ButtonLinkAdminComponent', () => {
  let component: ButtonLinkAdminComponent;
  let fixture: ComponentFixture<ButtonLinkAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLinkAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
