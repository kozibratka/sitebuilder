import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebListComponent } from './web-list.component';

describe('WebListComponent', () => {
  let component: WebListComponent;
  let fixture: ComponentFixture<WebListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
