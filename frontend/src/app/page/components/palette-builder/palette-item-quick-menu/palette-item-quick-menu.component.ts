import {Component, HostBinding, HostListener, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {PaletteItemComponent} from '../page-block/palette-item-component/palette-item.component';
import {PageBuilderComponent} from '../../../pages/page-builder/page-builder.component';
import {MoveableModalService} from '../../../../core/components/moveable-modal/tools/services/moveable-modal.service';
import {PluginResolverService} from '../../../../plugins/tools/services/plugin-resolver.service';
import {ElementHelper} from '../../../../core/helpers/element-helper';
import {MiniAdminComponent} from '../../../../core/components/mini-admin/mini-admin.component';


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

  private selectedItemForMenu: PaletteItemComponent;
  private lastMouserOveredElement = null;

  constructor(
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<PaletteItemComponent>,
    private paletteBuilderComponent: PaletteBuilderComponent,
    private moveableModalService: MoveableModalService,
    private pluginResolverService: PluginResolverService,
    private pageBuilderComponent: PageBuilderComponent
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
    this.quickMenuMessenger.subscribe((paletteItemElement) => {
      paletteItemElement = this.lastMouserOveredElement = paletteItemElement ? paletteItemElement : this.lastMouserOveredElement;
      this.display = 'block';
      this.selectedItemForMenu = paletteItemElement;
      const itemElement = paletteItemElement.elementRef.nativeElement;
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
    this.display = 'none';
    const plugin = this.selectedItemForMenu.componentRef.instance;
    const miniAdmin = this.moveableModalService.moveableModalComponent.content as MiniAdminComponent;
    const pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(
      this.selectedItemForMenu.componentRef.instance.settings.identifier
    );
    this.pageBuilderComponent.refreshGlobalPluginSelect(pluginResolver.identifier);
    this.pageBuilderComponent.moveableModalComponent.title = 'Úprava pluginu: ' + pluginResolver.name;
    miniAdmin.setAdminAble(pluginResolver, plugin.settings);
    this.moveableModalService.show();
  }
}