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
import {MenuPluginResolverService} from '../../../menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';
import {Subject} from 'rxjs';
import {QuickMenuMessenger} from '../../palette-item-quick-menu/interfaces/quick-menu-messenger';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridStackNode: GridStackNode;
  @ViewChild('itemTemplate', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;
  private lastPosition: string;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private elementRef: ElementRef<GridItemHTMLElement>,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<QuickMenuMessenger>,
    private zone: NgZone
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createPluginFromMenu();
    this.paletteBlockGridstackService.addWidget(this.elementRef);
    this.lastPosition = JSON.stringify(this.elementRef.nativeElement.getBoundingClientRect().toJSON());
    this.prepareItemQuickMenu(null);
  }

  ngAfterViewChecked(): void {
    const currentPosition = JSON.stringify(this.elementRef.nativeElement.getBoundingClientRect().toJSON());
    if (this.lastPosition !== currentPosition) {
      this.prepareItemQuickMenu(null);
      this.lastPosition = currentPosition;
    }
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
    this.quickMenuMessenger.next({mouseEvent: event, paletteItemComponent: this});
  }

}
