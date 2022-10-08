import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveableModalComponent } from './moveable-modal.component';

describe('MoveableModalComponent', () => {
  let component: MoveableModalComponent;
  let fixture: ComponentFixture<MoveableModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveableModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
