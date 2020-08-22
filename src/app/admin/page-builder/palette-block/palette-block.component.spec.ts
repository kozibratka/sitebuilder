import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteBlockComponent } from './palette-block.component';

describe('PaletteBlockComponent', () => {
  let component: PaletteBlockComponent;
  let fixture: ComponentFixture<PaletteBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
