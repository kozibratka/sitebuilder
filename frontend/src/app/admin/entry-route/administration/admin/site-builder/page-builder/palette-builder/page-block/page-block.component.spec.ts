import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageBlockComponent } from './page-block.component';

describe('PaletteBlockComponent', () => {
  let component: PageBlockComponent;
  let fixture: ComponentFixture<PageBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
