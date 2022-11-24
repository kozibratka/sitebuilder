import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGridItemComponent } from './public-grid-item.component';

describe('PublicGridItemComponent', () => {
  let component: PublicGridItemComponent;
  let fixture: ComponentFixture<PublicGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
