import {Component, ElementRef, HostBinding, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteItemComponent} from '../palette-block/palette-item/palette-item.component';
import {QuickMenuMessenger} from './interfaces/quick-menu-messenger';

@Component({
  selector: 'app-palette-item-quick-menu',
  templateUrl: './palette-item-quick-menu.component.html',
  styleUrls: ['./palette-item-quick-menu.component.css']
})
export class PaletteItemQuickMenuComponent implements OnInit {

  @HostBinding('style.left') leftPosition;
  @HostBinding('style.top') topPosition;
  @HostBinding('style.display') display;
  @HostBinding('style.position') position;
  @HostBinding('style.width') width;

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<QuickMenuMessenger>,
    private hostelement: ElementRef<HTMLElement>
  ) {

  }

  ngOnInit(): void {
    this.prepareQuickMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuMessenger.subscribe(quickMenuMessenger => {
      this.display = 'block';
      const itemElement = quickMenuMessenger.paletteItemComponent.getelementRef().nativeElement;
      const domRect = itemElement.getBoundingClientRect();
      const itemElementWidth = itemElement.offsetWidth;
      const itemElementHeight = itemElement.offsetHeight;
      const quickMenuPosition = {x: domRect.x, y: domRect.y };
      const hostNativeElement = this.hostelement.nativeElement;

      this.width = itemElementWidth + 'px';
      this.leftPosition = quickMenuPosition.x + 'px';
      console.log(this.leftPosition);
      this.topPosition = quickMenuPosition.y - hostNativeElement.offsetHeight + 'px';

      this.position = 'fixed';

    });
  }

}
