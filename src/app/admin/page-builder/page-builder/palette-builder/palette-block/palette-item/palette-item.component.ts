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
import {PaletteBlockGridstackService} from '../services/palette-block-gridstack.service';
import {MenuPluginResolverService} from '../../../menu-builder/menu-plugin-resolvers/services/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {ElementPositionMessenger} from '../../../../../../helpers/element/messengers/element-position-messenger';
import {ElementHelper} from '../../../../../../helpers/element/element-helper';
import {GridItemHTMLElementItemComponent} from '../../interfaces/grid-item-htmlelement-item-component';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridStackNode: GridStackNode;
  @ViewChild('itemTemplate', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;
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

  createPluginFromMenu(): void {
    if (!this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger) {
      return;
    }
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(
      this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger.componentClass);
    this.componentRef = this.viewContainerRef.createComponent<any>(factory);
  }

  prepareItemQuickMenu(event: MouseEvent): void {
    const itemElement = this.elementRef.nativeElement as GridItemHTMLElementItemComponent;
    itemElement.paletteItemComponent = this;
    this.quickMenuMessenger.next(itemElement);
  }
}
