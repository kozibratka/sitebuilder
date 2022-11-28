import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPageBlockComponent } from './public-page-block.component';

describe('PublicPageBlockComponent', () => {
  let component: PublicPageBlockComponent;
  let fixture: ComponentFixture<PublicPageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicPageBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
