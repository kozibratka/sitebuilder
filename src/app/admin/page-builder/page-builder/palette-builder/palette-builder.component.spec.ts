import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteBuilderComponent } from './palette-builder.component';

describe('PaletteBuilderComponent', () => {
  let component: PaletteBuilderComponent;
  let fixture: ComponentFixture<PaletteBuilderComponent>;

  beforeEach(async(() => {
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
