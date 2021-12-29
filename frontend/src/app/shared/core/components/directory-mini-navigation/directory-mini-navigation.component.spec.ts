import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryMiniNavigationComponent } from './directory-mini-navigation.component';

describe('DirectoryMiniNavigationComponent', () => {
  let component: DirectoryMiniNavigationComponent;
  let fixture: ComponentFixture<DirectoryMiniNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoryMiniNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryMiniNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
