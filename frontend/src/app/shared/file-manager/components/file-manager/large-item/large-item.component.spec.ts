import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeItemComponent } from './large-item.component';

describe('LargeItemComponent', () => {
  let component: LargeItemComponent;
  let fixture: ComponentFixture<LargeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
