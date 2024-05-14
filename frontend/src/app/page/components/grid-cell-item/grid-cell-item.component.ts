import {
  Component,
  ComponentRef,
  ElementRef, EventEmitter,
  HostListener,
  Inject,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {AbstractPluginResolver} from "../../services/abstract-classes/abstract-plugin-resolver";
import {AbstractPlugin} from "../../../plugins/abstract-class/abstract-plugin";
import {PluginResolverService} from "../../../plugins/services/plugin-resolver.service";
import {PageBuilderComponent} from "../../pages/page-builder/page-builder.component";
import {MoveableModalService} from "../../../core/components/moveable-modal/services/moveable-modal.service";
import {AdminPluginSelectComponent} from "../../../plugins/components/plugin-select/admin-plugin-select.component";
import {MiniAdminComponent} from "../../../core/components/mini-admin/mini-admin.component";

@Component({
  selector: 'app-grid-cell-item',
  templateUrl: './grid-cell-item.component.html',
  styleUrls: ['./grid-cell-item.component.css']
})
export class GridCellItemComponent implements OnInit, OnChanges{
  @Input() gridCellItem: GridCellItemInterface;
  @Input() isDeepChild = false;
  public pluginResolver: AbstractPluginResolver<any>;
  @ViewChild('content', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  plugin: ComponentRef<AbstractPlugin<any>>;
  showMoveIcon = false;
  isMoveMenuHover = false;
  @Output() deleteItem = new EventEmitter<boolean>();


  constructor(
    @Inject(AbstractPluginResolver) private abstractPluginResolvers: AbstractPluginResolver<any>[],
    // private quickMenuService: QuickMenuService,
    public elementRef: ElementRef,
    private pluginResolverService: PluginResolverService,
    private pageBuilderComponent: PageBuilderComponent,
    private moveableModalService: MoveableModalService,
  ) {
  }

  ngOnInit(): void {
    if (this.gridCellItem.plugin) {
      this.pluginResolver = this.getResolverFromIdentifier();
      this.createPlugin();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['gridCellItem'];
    if (change.previousValue) {
      this.plugin.instance.initializeSettings(this.gridCellItem.plugin);
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    // this.quickMenuService.moveMenu.next(this);
    this.showMoveIcon = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.showMoveIcon = false;
  }

  getResolverFromIdentifier() {
    return this.abstractPluginResolvers.find(value => {
      return value.identifier === this.gridCellItem.plugin.identifier;
    });
  }

  createPlugin() {
    let componentClass = this.pluginResolver.componentClass as any;
    this.plugin = this.pluginContainer.createComponent<AbstractPlugin<any>>(componentClass);
    this.plugin.instance.initializeSettings(this.gridCellItem.plugin);
  }

  delete() {
    this.deleteItem.emit(true);
  }

  openSettings() {
    const plugin = this.plugin.instance;
    const pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(
      plugin.settings.identifier
    );
    plugin.initializeSettings(this.gridCellItem.plugin);
    this.pageBuilderComponent.refreshGlobalPluginSelect(pluginResolver.identifier);
    let adminPages = [{label: 'Vybrat prvek', component: AdminPluginSelectComponent, path: ''},...pluginResolver.adminComponentsClass];
    let dialogInfo = this.moveableModalService.show<any>(MiniAdminComponent,
      {
      adminComponentsClass: adminPages,
      settings: this.gridCellItem.plugin,
      contextObject: plugin,
      },
      pluginResolver.name);
      dialogInfo.afterClosed().subscribe(value => {
        plugin.refreshView();
      });
      if (plugin.settings.webId) {
        let instanceReady = dialogInfo.componentInstance.instanceReady$.subscribe((value: MiniAdminComponent) => {
          value.allowedAdminComponent = AdminPluginSelectComponent;
          instanceReady.unsubscribe();
        });
      }
  }
}
