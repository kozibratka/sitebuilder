import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePageDialogComponent } from './remove-page-dialog.component';

describe('RemovePageDialogComponent', () => {
  let component: RemovePageDialogComponent;
  let fixture: ComponentFixture<RemovePageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovePageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovePageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
