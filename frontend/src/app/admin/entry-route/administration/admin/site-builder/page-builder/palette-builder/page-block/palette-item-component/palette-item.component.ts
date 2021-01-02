import {
  AfterViewChecked,
  AfterViewInit,
  Component, ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  ElementRef, HostListener, Inject,
  Input, NgZone,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {GridItemHTMLElement} from 'gridstack';
import {PaletteBlockGridstackService} from '../tools/services/palette-block-gridstack.service';
import {MenuPluginResolverService} from '../../../tools/services/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {ElementPositionMessenger} from '../../../../../../../../../core/messengers/element-position/element-position-messenger';
import {ElementHelper} from '../../../../../../../../../core/helpers/element-helper';
import {GridItemHTMLElementItemComponent} from '../../tools/interfaces/grid-item-htmlelement-item-component';
import {LinkGenerateAble} from '../../../../../../../../../core/interfaces/link-generate-able';
import {PaletteGridItemInterface} from './tools/interfaces/palette-grid-item-interface';
import {AbstractMenuPluginResolver} from '../../../tools/messengers/abstract-classes/abstract-menu-plugin-resolver';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridStackNode: PaletteGridItemInterface;
  @ViewChild('itemTemplate', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  private _componentRef: ComponentRef<LinkGenerateAble>;
  private lastPosition: ElementPositionMessenger;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private elementRef: ElementRef<GridItemHTMLElement>,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    @Inject(AbstractMenuPluginResolver) private _abstractMenuPluginResolverMessenger: AbstractMenuPluginResolver[],
    private zone: NgZone
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createPlugin();
    this.paletteBlockGridstackService.addWidget(this.elementRef);
    this.lastPosition = ElementHelper.getPositionToDocument(this.elementRef.nativeElement);
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

  get componentRef(): ComponentRef<LinkGenerateAble> {
    return this._componentRef;
  }

  set componentRef(value: ComponentRef<LinkGenerateAble>) {
    this._componentRef = value;
  }

  createPlugin(): void {
    let componentClass: new(...args: any[]) => {};
    if (this.gridStackNode.plugin.identifier === 'none') {
      componentClass = this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger.componentClass;
      this.gridStackNode.plugin.identifier = this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger.identifier;
    } else {
      componentClass = this.getComponentFromIdentifier();
    }
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(componentClass);
    this._componentRef = this.viewContainerRef.createComponent<LinkGenerateAble>(factory);
  }

  prepareItemQuickMenu(event: MouseEvent): void {
    const itemElement = this.elementRef.nativeElement as GridItemHTMLElementItemComponent;
    itemElement.paletteItemComponent = this;
    this.quickMenuMessenger.next(itemElement);
  }

  getComponentFromIdentifier(): new(...args: any[]) => {} {
    return this._abstractMenuPluginResolverMessenger.find(value => {
      return value.identifier === this.gridStackNode.plugin.identifier;
    }).componentClass;
  }
}
