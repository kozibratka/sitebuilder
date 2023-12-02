import {
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {AbstractPluginResolver} from "../../services/abstract-classes/abstract-plugin-resolver";
import {MenuPluginResolverService} from "../../services/menu-plugin-resolver.service";
import {AbstractPlugin} from "../../../plugins/abstract-class/abstract-plugin";
import {QuickMenuService} from "../../services/quick-menu.service";

@Component({
  selector: 'app-grid-cell-item',
  templateUrl: './grid-cell-item.component.html',
  styleUrls: ['./grid-cell-item.component.css']
})
export class GridCellItemComponent implements OnInit{
  @Input() gridCellItem: GridCellItemInterface;
  public pluginResolver: AbstractPluginResolver<any>;
  @ViewChild('content', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  plugin: ComponentRef<AbstractPlugin<any>>;
  showMoveIcon = false;


  constructor(
    @Inject(AbstractPluginResolver) private abstractPluginResolvers: AbstractPluginResolver<any>[],
    private menuPluginResolverService: MenuPluginResolverService,
    private quickMenuService: QuickMenuService,
    public elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    if (this.gridCellItem.plugin) {
      if (!this.gridCellItem.plugin.id) {
        this.pluginResolver = this.menuPluginResolverService.selectedAbstractPluginResolverMessenger;
      } else {
        this.pluginResolver = this.getResolverFromIdentifier();
      }
      this.createPlugin();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.quickMenuService.moveMenu.next(this);
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
}
