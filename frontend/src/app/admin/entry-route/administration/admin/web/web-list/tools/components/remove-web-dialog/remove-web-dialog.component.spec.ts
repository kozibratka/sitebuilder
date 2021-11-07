import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoveWebDialogComponent } from './remove-web-dialog.component';

describe('RemoveWebDialogComponent', () => {
  let component: RemoveWebDialogComponent;
  let fixture: ComponentFixture<RemoveWebDialogComponent>;

  beforeEach(waitForAsync(() => {
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
