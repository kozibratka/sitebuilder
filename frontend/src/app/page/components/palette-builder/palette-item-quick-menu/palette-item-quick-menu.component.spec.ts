import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PaletteItemQuickMenuComponent} from './palette-item-quick-menu.component';

describe('PaletteItemQuickMenuComponent', () => {
  let component: PaletteItemQuickMenuComponent;
  let fixture: ComponentFixture<PaletteItemQuickMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaletteItemQuickMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaletteItemQuickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
