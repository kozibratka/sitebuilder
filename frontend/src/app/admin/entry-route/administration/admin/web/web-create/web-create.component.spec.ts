import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebCreateComponent } from './web-create.component';

describe('WebCreateComponent', () => {
  let component: WebCreateComponent;
  let fixture: ComponentFixture<WebCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
