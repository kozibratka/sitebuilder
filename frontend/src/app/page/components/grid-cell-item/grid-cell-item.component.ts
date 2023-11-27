import {Component, ComponentRef, Inject, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {AbstractPluginResolver} from "../../services/abstract-classes/abstract-plugin-resolver";
import {MenuPluginResolverService} from "../../services/menu-plugin-resolver.service";
import {AbstractPlugin} from "../../../plugins/abstract-class/abstract-plugin";

@Component({
  selector: 'app-grid-cell-item',
  templateUrl: './grid-cell-item.component.html',
  styleUrls: ['./grid-cell-item.component.css']
})
export class GridCellItemComponent implements OnInit{
  @Input() gridCellItem: GridCellItemInterface;
  public pluginResolver: AbstractPluginResolver;
  @ViewChild('content', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  private plugin: ComponentRef<AbstractPlugin<any>>;


  constructor(
    @Inject(AbstractPluginResolver) private abstractPluginResolver: AbstractPluginResolver[],
    private menuPluginResolverService: MenuPluginResolverService,
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

  getResolverFromIdentifier() {
    return this.abstractPluginResolver.find(value => {
      return value.identifier === this.gridCellItem.plugin.identifier;
    });
  }

  createPlugin() {
    let componentClass = this.pluginResolver.componentClass as any;
    this.plugin = this.pluginContainer.createComponent<AbstractPlugin<any>>(componentClass);
    this.plugin.instance.initializeSettings(this.gridCellItem.plugin);
  }
}
