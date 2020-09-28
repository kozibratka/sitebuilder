import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteItemComponent} from '../palette-block/palette-item/palette-item.component';

@Component({
  selector: 'app-palette-item-quick-menu',
  templateUrl: './palette-item-quick-menu.component.html',
  styleUrls: ['./palette-item-quick-menu.component.css']
})
export class PaletteItemQuickMenuComponent implements OnInit {

  @HostBinding('style.color') leftPosition;

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<PaletteItemComponent>
  ) {

  }

  ngOnInit(): void {
    this.prepareQuickMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuMessenger.subscribe(paletteItemComponent => {
      this.leftPosition = 'yellow';
    });
  }

}
