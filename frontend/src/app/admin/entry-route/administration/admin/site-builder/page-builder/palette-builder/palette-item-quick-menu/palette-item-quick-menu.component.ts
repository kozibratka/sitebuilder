import {Component, ElementRef, HostBinding, HostListener, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {ElementHelper} from '../../../../../../../../core/helpers/element-helper';
import {GridItemHTMLElementItemComponent} from '../tools/interfaces/grid-item-htmlelement-item-component';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashDataService} from '../../../../../../../../core/services/flash-data.service';
import {PluginComponentInterface} from '../page-block/palette-item-component/tools/interfaces/plugin-component-interface';


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

  private selectedItemForMenu: GridItemHTMLElementItemComponent;

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    private paletteBuilderComponent: PaletteBuilderComponent,
    private router: Router,
    private route: ActivatedRoute,
    private flashData: FlashDataService<PluginComponentInterface>
  ) {

  }

  ngOnInit(): void {
    this.prepareQuickMenu();
  }

  @HostListener('click')
  onClick(): void {
    this.openItemMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuMessenger.subscribe(paletteItemElement => {
      this.display = 'block';
      const itemElement = this.selectedItemForMenu = paletteItemElement;
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

  private openItemMenu(): void{
    const selectedComponent = this.selectedItemForMenu.paletteItemComponent.componentRef.instance;
    const link = selectedComponent.getLink();
    link.commands[0] = 'item-admin/' + link.commands[0];
    this.flashData.add('selectedComponent', selectedComponent);
    this.display = 'none';
    this.router.navigate(link.commands, {relativeTo: this.route});
  }

}
