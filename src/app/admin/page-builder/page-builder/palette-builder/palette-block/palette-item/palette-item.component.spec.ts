import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteItemComponent } from './palette-item.component';

describe('PaletteItemComponent', () => {
  let component: PaletteItemComponent;
  let fixture: ComponentFixture<PaletteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
