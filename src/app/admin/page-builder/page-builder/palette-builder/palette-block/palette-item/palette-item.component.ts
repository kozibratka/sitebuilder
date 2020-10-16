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
import {GridItemHTMLElement, GridStackNode} from 'gridstack';
import {PaletteBlockGridstackService} from '../tools/services/palette-block-gridstack.service';
import {MenuPluginResolverService} from '../../../tools/services/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {ElementPositionMessenger} from '../../../../../../core/messengers/element-position-messenger';
import {ElementHelper} from '../../../../../../core/helpers/element-helper';
import {GridItemHTMLElementItemComponent} from '../../tools/interfaces/grid-item-htmlelement-item-component';
import {LinkGenerateAble} from '../../../../../../core/interfaces/link-generate-able';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridStackNode: GridStackNode;
  @ViewChild('itemTemplate', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  private _componentRef: ComponentRef<LinkGenerateAble>;
  private lastPosition: ElementPositionMessenger;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private elementRef: ElementRef<GridItemHTMLElement>,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    private zone: NgZone
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createPluginFromMenu();
    this.paletteBlockGridstackService.addWidget(this.elementRef);
    this.lastPosition = ElementHelper.getPositionToDocument(this.elementRef.nativeElement);
    this.prepareItemQuickMenu(null);
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

  createPluginFromMenu(): void {
    if (!this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger) {
      return;
    }
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
      this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger.componentClass);
    this._componentRef = this.viewContainerRef.createComponent<LinkGenerateAble>(factory);
  }

  prepareItemQuickMenu(event: MouseEvent): void {
    const itemElement = this.elementRef.nativeElement as GridItemHTMLElementItemComponent;
    itemElement.paletteItemComponent = this;
    this.quickMenuMessenger.next(itemElement);
  }
}
