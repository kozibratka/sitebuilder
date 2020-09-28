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
import {GridStackNode} from 'gridstack';
import {PaletteBlockGridstackService} from '../services/palette-block-gridstack.service';
import {MenuPluginResolverService} from '../../../menu-builder/services/menu-plugin-resolvers/menu-plugin-resolver.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() gridStackNode: GridStackNode;
  @ViewChild('itemTemplate', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private elementRef: ElementRef,
    private menuPluginResolverService: MenuPluginResolverService,
    private resolver: ComponentFactoryResolver,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<PaletteItemComponent>,
    private zone: NgZone
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createPluginFromMenu();
    this.paletteBlockGridstackService.addWidget(this.elementRef);
  }

  ngAfterViewChecked(): void {
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.prepareItemQuickMenu();
  }

  getelementRef(): ElementRef {
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

  prepareItemQuickMenu(): void {
    this.quickMenuMessenger.next(this);
  }

}
