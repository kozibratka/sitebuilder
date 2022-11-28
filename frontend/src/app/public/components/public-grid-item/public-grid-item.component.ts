import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef, ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AbstractPlugin} from '../../../plugins/tools/abstract-class/abstract-plugin';
import {PaletteItemConfig} from '../../../page/interfaces/palette-item-config';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {BasePlugConfigInterface} from '../../../plugins/tools/interfaces/base-plug-config-interface';
import {PaletteBlockGridstackService} from '../../../page/services/palette-block-gridstack.service';
import {GridItemHTMLElement} from 'gridstack';
import {PublicPageBlockComponent} from '../public-page-block/public-page-block.component';

@Component({
  selector: 'app-public-grid-item',
  templateUrl: './public-grid-item.component.html',
  styleUrls: ['./public-grid-item.component.css']
})
export class PublicGridItemComponent implements OnInit {

  @Input() gridItemConfig: PaletteItemConfig;
  @ViewChild('container', {read: ViewContainerRef, static: true}) container: ViewContainerRef;
  private component: ComponentRef<AbstractPlugin<BasePlugConfigInterface>>;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    @Inject(AbstractPluginResolver) private abstractPluginResolver: AbstractPluginResolver[],
    public elementRef: ElementRef<GridItemHTMLElement>,
    private publicPageBlockComponent: PublicPageBlockComponent,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.createPlugin();
  }

  createPlugin(): void {
    let componentClass: new(...args: any[]) => {};
    componentClass = this.getComponentFromIdentifier();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentClass);
    this.component = this.container.createComponent<AbstractPlugin<BasePlugConfigInterface>>(factory);
    this.component.instance.initializeSettings(this.gridItemConfig.plugin);
    this.paletteBlockGridstackService.addWidgetPublic(this, this.publicPageBlockComponent.paletteContent.nativeElement);
  }

  getComponentFromIdentifier(): new(...args: any[]) => {} {
    return this.abstractPluginResolver.find(value => {
      return value.identifier === this.gridItemConfig.plugin.identifier;
    }).componentClass;
  }

}
