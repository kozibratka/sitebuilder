import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageBuilderComponent } from './page-builder.component';

describe('PageBuilderComponent', () => {
  let component: PageBuilderComponent;
  let fixture: ComponentFixture<PageBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
