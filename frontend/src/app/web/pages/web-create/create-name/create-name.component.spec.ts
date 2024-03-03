import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNameComponent } from './create-name.component';

describe('CreateNameComponent', () => {
  let component: CreateNameComponent;
  let fixture: ComponentFixture<CreateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
