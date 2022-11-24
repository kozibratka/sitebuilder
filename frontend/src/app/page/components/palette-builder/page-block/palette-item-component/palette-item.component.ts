import {
  AfterViewChecked,
  AfterViewInit,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  ElementRef, HostListener, Inject,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GridItemHTMLElement} from 'gridstack';
import {MenuPluginResolverService} from '../../../../services/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {AbstractPluginResolver} from '../../../../services/abstract-classes/abstract-plugin-resolver';
import {WebDetailResolverService} from '../../../../../web/services/web-detail-resolver.service';
import {AbstractPlugin} from '../../../../../plugins/tools/abstract-class/abstract-plugin';
import {ElementPositionMessenger} from '../../../../../core/messengers/element-position/element-position-messenger';
import {ElementHelper} from '../../../../../core/helpers/element-helper';
import {PaletteItemConfig} from '../../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../../services/palette-block-gridstack.service';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridItemConfig: PaletteItemConfig;
  @ViewChild('itemTemplate', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  private _componentRef: ComponentRef<AbstractPlugin<any>>;
  private lastPosition: ElementPositionMessenger;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    public elementRef: ElementRef<GridItemHTMLElement>,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    private webDetailResolverService: WebDetailResolverService,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<PaletteItemComponent>,
    @Inject(AbstractPluginResolver) private abstractPluginResolver: AbstractPluginResolver[],
  ) {

  }

  ngOnInit(): void {
    this.createPlugin();
    this.paletteBlockGridstackService.addWidget(this);
    this.lastPosition = ElementHelper.getPositionToDocument(this.elementRef.nativeElement);
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.prepareItemQuickMenu(event);
  }

  getelementRef(): ElementRef<GridItemHTMLElement> {
    return this.elementRef;
  }

  getHeightInGrid(): number {
    return this.getelementRef().nativeElement.gridstackNode.height;
  }

  getYPositionInGrid(): number {
    return this.getelementRef().nativeElement.gridstackNode.y;
  }

  getRowsInGrid(): number {
    return this.getHeightInGrid() + this.getYPositionInGrid();
  }

  get componentRef(): ComponentRef<AbstractPlugin<any>> {
    return this._componentRef;
  }

  set componentRef(value: ComponentRef<AbstractPlugin<any>>) {
    this._componentRef = value;
  }

  createPlugin(): void {
    let componentClass: new(...args: any[]) => {};
    const isNewPlugin = !!!this.gridItemConfig.plugin.id;
    if (isNewPlugin) {
      componentClass = this.menuPluginResolverService.selectedAbstractPluginResolverMessenger.componentClass;
    } else {
      componentClass = this.getComponentFromIdentifier();
    }
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentClass);
    this._componentRef = this.pluginContainer.createComponent<AbstractPlugin<any>>(factory);
    this._componentRef.instance.initializeSettings(this.gridItemConfig.plugin);
  }

  prepareItemQuickMenu(event: MouseEvent): void {
    this.quickMenuMessenger.next(this);
  }

  getComponentFromIdentifier(): new(...args: any[]) => {} {
    return this.abstractPluginResolver.find(value => {
      return value.identifier === this.gridItemConfig.plugin.identifier;
    }).componentClass;
  }
}
