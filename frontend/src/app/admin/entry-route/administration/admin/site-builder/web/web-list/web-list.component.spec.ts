import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebListComponent } from './web-list.component';

describe('WebListComponent', () => {
  let component: WebListComponent;
  let fixture: ComponentFixture<WebListComponent>;

  beforeEach(async(() => {
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
