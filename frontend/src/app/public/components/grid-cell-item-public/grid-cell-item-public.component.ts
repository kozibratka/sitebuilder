import {Component, ComponentRef, ElementRef, Inject, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AbstractPlugin} from "../../../plugins/abstract-class/abstract-plugin";
import {GridCellItemInterface} from "../../../page/interfaces/grid-cell-item-interface";
import {AbstractPluginResolver} from "../../../page/services/abstract-classes/abstract-plugin-resolver";

@Component({
  selector: 'app-grid-cell-item-public',
  templateUrl: './grid-cell-item-public.component.html',
  styleUrls: ['./grid-cell-item-public.component.css']
})
export class GridCellItemPublicComponent implements OnInit{
  @Input() gridCellItem: GridCellItemInterface;
  @Input() isDeepChild = false;
  public pluginResolver: AbstractPluginResolver<any>;
  @ViewChild('content', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  plugin: ComponentRef<AbstractPlugin<any>>;


  constructor(
    @Inject(AbstractPluginResolver) private abstractPluginResolvers: AbstractPluginResolver<any>[],
    public elementRef: ElementRef,
  ) {
  }
  ngOnInit(): void {
    if (this.gridCellItem.plugin) {
      this.pluginResolver = this.getResolverFromIdentifier();
      this.createPlugin();
    }
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

  getVerticalPadding() {
    if (this.gridCellItem.row) {
      return {};
    }
    return {
      paddingBottom: (this.gridCellItem.plugin?.paddingBottom ?? 15)+'px',
      paddingTop: (this.gridCellItem.plugin?.paddingTop ?? 0)+'px'
    };
  }
}
