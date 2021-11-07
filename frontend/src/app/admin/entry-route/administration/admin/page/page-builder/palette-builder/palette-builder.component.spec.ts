import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaletteBuilderComponent } from './palette-builder.component';

describe('PaletteBuilderComponent', () => {
  let component: PaletteBuilderComponent;
  let fixture: ComponentFixture<PaletteBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
