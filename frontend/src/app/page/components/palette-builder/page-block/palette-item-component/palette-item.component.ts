import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GridItemHTMLElement} from 'gridstack';
import {MenuPluginResolverService} from '../../../../services/menu-plugin-resolver.service';
import {Subject, Subscription} from 'rxjs';
import {AbstractPluginResolver} from '../../../../services/abstract-classes/abstract-plugin-resolver';
import {WebDetailResolverService} from '../../../../../web/services/web-detail-resolver.service';
import {ElementPositionMessenger} from '../../../../../core/messengers/element-position/element-position-messenger';
import {ElementHelper} from '../../../../../core/helpers/element-helper';
import {PaletteItemConfig} from '../../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../../services/palette-block-gridstack.service';
import {PageBlockComponent} from '../page-block.component';
import {AbstractPlugin} from '../../../../../plugins/abstract-class/abstract-plugin';
import {QuickMenuService} from '../../../../services/quick-menu.service';
import {StringService} from '../../../../../core/services/string.service';

@Component({
  selector: 'app-grid-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() gridItemConfig: PaletteItemConfig;
  @ViewChild('itemTemplate', {read: ViewContainerRef, static: true}) pluginContainer: ViewContainerRef;
  @ViewChild('gridContent', {read: ElementRef, static: true}) gridContent: ElementRef;
  private _componentRef: ComponentRef<AbstractPlugin<any>>;
  private lastPosition: ElementPositionMessenger;
  public pluginResolver: AbstractPluginResolver;
  private pageBuilderEventSubscription: Subscription;
  showMoveIcon = false;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    public pageBlockComponent: PageBlockComponent,
    public elementRef: ElementRef<GridItemHTMLElement>,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    private webDetailResolverService: WebDetailResolverService,
    private quickMenuService: QuickMenuService,
    @Inject(AbstractPluginResolver) private abstractPluginResolver: AbstractPluginResolver[],
    @Inject('PageBuilderEvent') private pageBuilderEvent: Subject<boolean>,
  ) {

  }

  ngOnInit(): void {
    const isNewPlugin = !!!this.gridItemConfig.plugin.id;
    if (isNewPlugin) {
      this.pluginResolver = this.menuPluginResolverService.selectedAbstractPluginResolverMessenger;
    } else {
      this.pluginResolver = this.getResolverFromIdentifier();
    }
    this.createPlugin();
    this.paletteBlockGridstackService.addWidget(this, this.pageBlockComponent.paletteContent.nativeElement);
    this.lastPosition = ElementHelper.getPositionToDocument(this.elementRef.nativeElement);
    if (this.pluginResolver.isAutoResizeHeight()) {
      this.pageBuilderEventSubscription = this.pageBuilderEvent.subscribe(value => {
        this.gridItemConfig.diffGridAndContentBottomHeightPx =
          this.paletteBlockGridstackService.getBottomDiffPx(this.elementRef.nativeElement, this.gridContent.nativeElement);
      });
    }
  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {
  }

  ngOnDestroy(): void {
    if (this.pageBuilderEventSubscription) {
      this.pageBuilderEventSubscription.unsubscribe();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.prepareItemQuickMenu(event);
    this.showMoveIcon = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.showMoveIcon = false;
  }

  getelementRef(): ElementRef<GridItemHTMLElement> {
    return this.elementRef;
  }

  getHeightInGrid(): number {
    return this.getelementRef().nativeElement.gridstackNode.h;
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
    componentClass = this.pluginResolver.componentClass;
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentClass);
    this._componentRef = this.pluginContainer.createComponent<AbstractPlugin<any>>(factory);
    this._componentRef.instance.initializeSettings(this.gridItemConfig.plugin);
  }

  prepareItemQuickMenu(event: MouseEvent): void {
    this.quickMenuService.moveMenu.next(this);
  }

  getResolverFromIdentifier() {
    return this.abstractPluginResolver.find(value => {
      return value.identifier === this.gridItemConfig.plugin.identifier;
    });
  }
}
