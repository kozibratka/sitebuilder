import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone, OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {GridItemHTMLElement} from 'gridstack/dist/gridstack';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {PaletteItemComponent} from './palette-item-component/palette-item.component';
import {Subject, Subscription} from 'rxjs';
import {PageBlockInterface} from '../../../interfaces/page-block-interface';
import {PaletteItemConfig} from '../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../services/palette-block-gridstack.service';
import {QuickMenuService} from '../../../services/quick-menu.service';
import {AbstractPlugin} from '../../../../plugins/abstract-class/abstract-plugin';
import {BasePlugConfigInterface} from '../../../../plugins/interfaces/base-plug-config-interface';
import {PaletteBlockService} from '../../../services/palette-block.service';
import {StringService} from '../../../../core/services/string.service';

@Component({
  selector: 'app-palette-block',
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.css'],
})
export class PageBlockComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef<HTMLElement>;
  @ViewChildren(PaletteItemComponent) paletteItemComponents: QueryList<PaletteItemComponent>;
  @Output() resized = new EventEmitter<boolean>();
  private _pageBlock: PageBlockInterface;
  draggingItemBottom = false;
  updateBottomPaddingSubscription: Subscription;
  private itemStatesBeforeDragging = new Map<AbstractPlugin<any>, BasePlugConfigInterface>();
  rows = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    private quickMenuService: QuickMenuService,
    private elementRef: ElementRef,
    private paletteBlockService: PaletteBlockService,

    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    @Inject(DOCUMENT) private document: Document,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
  }

  ngOnInit(): void {
    // this.initGridStack();
    // this.registerOnDraggedItem();
    // this.registerIsResizedOnDrag();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.updateBottomPaddingSubscription.unsubscribe();
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    // this.prepareResizeHorizontalPalette(event);
  }

  trackByGridItem(index, item: PaletteItemConfig ) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }

  private prepareResizeHorizontalPalette(event: MouseEvent): void{
    const actualHeight = this.paletteContent.nativeElement.offsetHeight;
    if (event.offsetY < actualHeight - 7) {
      return;
    }
    this.resized.emit(true);
    this.paletteBlockGridstackService.
    prepareResizeHorizontalPalette(this.paletteItemComponents.toArray(), event, this.paletteContent.nativeElement);
    let resizeMouseMovePaletteListener: () => void;
    this.ngZone.runOutsideAngular(() => {
      resizeMouseMovePaletteListener = this.renderer.listen(
        this.document,
        'mousemove',
        (mouseEvent) => this.paletteBlockGridstackService.
        resizeHorizontalPalette(mouseEvent, this.paletteContent.nativeElement, this._pageBlock)
      );
    });
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      this.resized.emit(false);
      resizeMouseMovePaletteListener();
      mouseUpListener();
    });

  }

  private initGridStack(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this._pageBlock.paletteGridItems, this._pageBlock, this.changeDetectorRef);
    const gridstackBlock = this.paletteBlockGridstackService.gridstackBlocks.get(this.paletteContent.nativeElement);
    gridstackBlock.on('dragstop', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuService.moveMenu.next(true);
      this.quickMenuService.moveMenu.next(null);
      this.gridItemDragged.next(false);
    });
    gridstackBlock.on('dragstart', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuService.moveMenu.next(false);
      this.gridItemDragged.next(true);
    });
    gridstackBlock.on('resizestop', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuService.moveMenu.next(null);
      this.gridItemDragged.next(false);
      this.applicationRef.tick();

    });
    gridstackBlock.on('resizestart', (event: Event, el: GridItemHTMLElement) => {
      this.gridItemDragged.next(true);
      this.applicationRef.tick();
    });
  }

  private registerOnDraggedItem() {
    this.updateBottomPaddingSubscription = this.gridItemDragged.subscribe(value => {
      if (value) {
        this.draggingItemBottom = true;
        this.enableDisablePlugins(true);
      } else {
        this.enableDisablePlugins(false);
        this.draggingItemBottom = false;
      }
    });
  }

  private enableDisablePlugins(disable = true) {
    if (disable) {
      this.itemStatesBeforeDragging.clear();
      this.paletteItemComponents.forEach(item => {
        const plugin = item.componentRef.instance;
        this.itemStatesBeforeDragging.set(plugin, {...plugin.settings});
        const offState = item.componentRef.instance.getDisabledStateWhenDraggingItem();
        Object.assign(plugin.settings, offState);

      });
    } else {
      this.itemStatesBeforeDragging.forEach((settings, plugin) => {
        Object.assign(plugin.settings, settings);
      });
    }

    this.draggingItemBottom = true;
    this.changeDetectorRef.detectChanges();
  }
  private registerIsResizedOnDrag() {
    let sizeObserver;
    this.gridItemDragged.subscribe(value => {
      if (value) {
        sizeObserver = new ResizeObserver((entries) => {
          this.paletteBlockService.isResized$.next(true);
        });
        sizeObserver.observe(this.paletteContent.nativeElement);
      } else {
        sizeObserver.unobserve(this.paletteContent.nativeElement);
      }
    });
  }
  get pageBlock(): PageBlockInterface {
    return this._pageBlock;
  }
  @Input()
  set pageBlock(value: PageBlockInterface) {
    this._pageBlock = value;
    this.paletteBlockGridstackService.gridStackNodes = this._pageBlock.paletteGridItems;
  }
  removeGridItem(paletteItemComponent: PaletteItemComponent) {
    const index = this._pageBlock.paletteGridItems.indexOf(paletteItemComponent.gridItemConfig);
    if (index !== -1) {
      this._pageBlock.paletteGridItems.splice(index, 1);
    }
  }
}
