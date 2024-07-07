import {Component, HostBinding, HostListener, Inject, OnInit} from '@angular/core';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {PageBuilderComponent} from '../../../pages/page-builder/page-builder.component';
import {ElementHelper} from '../../../../core/helpers/element-helper';
import {MoveableModalService} from '../../../../core/components/moveable-modal/services/moveable-modal.service';
import {PluginResolverService} from '../../../../plugins/shared/services/plugin-resolver.service';
import {QuickMenuService} from '../../../services/quick-menu.service';
import {GridCellItemComponent} from "../../grid-cell-item/grid-cell-item.component";


@Component({
  selector: 'app-palette-item-quick-menu',
  standalone: true,
  templateUrl: './palette-item-quick-menu.component.html',
  styleUrls: ['./palette-item-quick-menu.component.css']
})
export class PaletteItemQuickMenuComponent implements OnInit {

  @HostBinding('style.left') leftPosition;
  @HostBinding('style.top') topPosition;
  @HostBinding('style.display') display = 'none';
  @HostBinding('style.width') width;

  private selectedItemForMenu: GridCellItemComponent;
  private lastMouserOveredElement = null;
  private isEnabled = true;

  constructor(
    private paletteBuilderComponent: PaletteBuilderComponent,
    private moveableModalService: MoveableModalService,
    private pluginResolverService: PluginResolverService,
    private pageBuilderComponent: PageBuilderComponent,
    private quickMenuService: QuickMenuService,
  ) {

  }

  ngOnInit(): void {
    //this.prepareQuickMenu();
  }

  @HostListener('click')
  onClick(): void {
    //this.openItemMenu();
  }

  private prepareQuickMenu(): void {
    this.quickMenuService.moveMenu.subscribe((paletteItemElement) => {
      if (typeof paletteItemElement === 'boolean') {
        this.isEnabled = paletteItemElement;
        if (!this.isEnabled) {
          this.display = 'none';
        }
        return;
      }
      if (!this.isEnabled) {
        return;
      }
      this.display = 'block';
      paletteItemElement = this.lastMouserOveredElement =
        paletteItemElement ? paletteItemElement as GridCellItemComponent : this.lastMouserOveredElement as GridCellItemComponent;
      this.selectedItemForMenu = paletteItemElement;
      const itemElement = paletteItemElement.elementRef.nativeElement;
      const position = ElementHelper.getPositionToParentElement(itemElement, this.paletteBuilderComponent.palette.nativeElement, {
        x: 19,
        y: 75
      });
      const itemElementWidth = itemElement.offsetWidth;
      this.width = itemElementWidth + 'px';
      this.leftPosition = position.x + 'px';
      this.topPosition = position.y + 'px';
    });
  }

  // private openItemMenu(): void{
  //   this.display = 'none';
  //   const plugin = this.selectedItemForMenu.plugin.instance;
  //   const pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(
  //     plugin.settings.identifier
  //   );
  //   this.pageBuilderComponent.refreshGlobalPluginSelect(pluginResolver.identifier);
  //   this.moveableModalService.show(PluginMiniAdminComponent, {
  //     adminAbleInterface: pluginResolver,
  //     settings: plugin.settings,
  //     page: this.pageBuilderComponent.pageDetail,
  //     title: pluginResolver.name,
  //     plugin,
  //   }).afterClosed().subscribe(value => {
  //     plugin.refreshView();
  //   });
  // }
}
