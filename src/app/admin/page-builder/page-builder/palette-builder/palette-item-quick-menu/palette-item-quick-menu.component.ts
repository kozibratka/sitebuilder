import {Component, ElementRef, HostBinding, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {ElementHelper} from '../../../../../core/helpers/element-helper';
import {GridItemHTMLElementItemComponent} from '../tools/interfaces/grid-item-htmlelement-item-component';


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
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {

  }

  ngOnInit(): void {
    this.prepareQuickMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuMessenger.subscribe(paletteItemElement => {
      this.display = 'block';
      const itemElement = paletteItemElement;
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
