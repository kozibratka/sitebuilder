import {Component, ElementRef, HostBinding, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {QuickMenuMessenger} from './interfaces/quick-menu-messenger';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {ElementHelper} from '../../../../../helpers/element/element-helper';


@Component({
  selector: 'app-palette-item-quick-menu',
  templateUrl: './palette-item-quick-menu.component.html',
  styleUrls: ['./palette-item-quick-menu.component.css']
})
export class PaletteItemQuickMenuComponent implements OnInit {

  @HostBinding('style.left') leftPosition;
  @HostBinding('style.top') topPosition;
  @HostBinding('style.display') display;
  @HostBinding('style.width') width;

  private paletteBlockPosition: {x: number, y: number};

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<QuickMenuMessenger>,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {

  }

  ngOnInit(): void {
    this.prepareQuickMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuMessenger.subscribe(quickMenuMessenger => {
      this.display = 'block';
      const itemElement = quickMenuMessenger.paletteGridStackItem;
      const position = ElementHelper.getPositionToParentElement(itemElement, this.paletteBuilderComponent.palette.nativeElement, {
        x: 19,
        y: 28
      });
      const itemElementWidth = itemElement.offsetWidth;
      this.width = itemElementWidth + 'px';
      this.leftPosition = position.x + 'px';
      this.topPosition = position.y + 'px';
    });
  }

}
