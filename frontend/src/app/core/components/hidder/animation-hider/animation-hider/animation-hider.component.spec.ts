import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationHiderComponent } from './animation-hider.component';

describe('AnimationHiderComponent', () => {
  let component: AnimationHiderComponent;
  let fixture: ComponentFixture<AnimationHiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationHiderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationHiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
