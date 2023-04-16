import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, ElementRef,
  Inject,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PaletteItemConfig} from '../../../page/interfaces/palette-item-config';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {PaletteBlockGridstackService} from '../../../page/services/palette-block-gridstack.service';
import {GridItemHTMLElement} from 'gridstack';
import {PublicPageBlockComponent} from '../public-page-block/public-page-block.component';
import {AbstractPlugin} from '../../../plugins/abstract-class/abstract-plugin';
import {BasePlugConfigInterface} from '../../../plugins/interfaces/base-plug-config-interface';

@Component({
  selector: 'app-public-grid-item',
  templateUrl: './public-grid-item.component.html',
  styleUrls: ['./public-grid-item.component.css']
})
export class PublicGridItemComponent implements OnInit, OnDestroy {

  @Input() gridItemConfig: PaletteItemConfig;
  @ViewChild('container', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  @ViewChild('gridContent', {read: ElementRef, static: true}) gridContent: ElementRef;
  private component: ComponentRef<AbstractPlugin<BasePlugConfigInterface>>;
  private resizeObserver: ResizeObserver;
  private pluginResolver: AbstractPluginResolver;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    @Inject(AbstractPluginResolver) private abstractPluginResolver: AbstractPluginResolver[],
    public elementRef: ElementRef<GridItemHTMLElement>,
    public pageBlockComponent: PublicPageBlockComponent,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.pluginResolver = this.getResolver();
    this.createPlugin();
    if (this.pluginResolver.isAutoResizeHeight()) {
      this.resizeObserver = new ResizeObserver(entries => {
        this.paletteBlockGridstackService.recalculateGridHeightByContent(this);
      });
      this.resizeObserver.observe(this.gridContent.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  createPlugin(): void {
    let componentClass: new(...args: any[]) => {};
    componentClass = this.pluginResolver.componentClass;
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentClass);
    this.component = this.pluginContainer.createComponent<AbstractPlugin<BasePlugConfigInterface>>(factory);
    this.component.instance.initializeSettings(this.gridItemConfig.plugin);
    this.paletteBlockGridstackService.addWidgetPublic(this, this.pageBlockComponent.paletteContent.nativeElement);
  }

  getResolver() {
    return this.abstractPluginResolver.find(value => {
      return value.identifier === this.gridItemConfig.plugin.identifier;
    });
  }

}
