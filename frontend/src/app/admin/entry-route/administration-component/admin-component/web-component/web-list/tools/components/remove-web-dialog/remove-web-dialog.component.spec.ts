import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveWebDialogComponent } from './remove-web-dialog.component';

describe('RemoveWebDialogComponent', () => {
  let component: RemoveWebDialogComponent;
  let fixture: ComponentFixture<RemoveWebDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveWebDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveWebDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
