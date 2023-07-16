import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
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
import {GridItemHTMLElementItemComponent} from '../../../interfaces/grid-item-htmlelement-item-component';
import {PaletteItemConfig} from '../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../services/palette-block-gridstack.service';
import {QuickMenuService} from '../../../services/quick-menu.service';

@Component({
  selector: 'app-palette-block',
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.css'],
})
export class PageBlockComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef<HTMLElement>;
  @ViewChildren(PaletteItemComponent) paletteItemComponents: QueryList<PaletteItemComponent>;
  @Output() resized = new EventEmitter<boolean>();
  @Input() pageBlock: PageBlockInterface;
  gridNodes: PaletteItemConfig[] = [];
  draggingItemBottom = false;
  updateBottomPaddingSubscription: Subscription;

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    private quickMenuService: QuickMenuService,
    private elementRef: ElementRef,

    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    @Inject(DOCUMENT) private document: Document,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
  }

  ngOnInit(): void {
    if (this.pageBlock.paletteGridItems) {
      this.gridNodes = this.pageBlock.paletteGridItems;
    }
    this.initGridStack();
    this.registerUpdateBlockBottomPadding();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.updateBottomPaddingSubscription.unsubscribe();
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    // this.prepareResizeHorizontalPalette(event);
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
        resizeHorizontalPalette(mouseEvent, this.paletteContent.nativeElement, this.pageBlock)
      );
    });
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      this.resized.emit(false);
      resizeMouseMovePaletteListener();
      mouseUpListener();
    });

  }

  private initGridStack(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes, this.pageBlock, this.changeDetectorRef);
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

  private registerUpdateBlockBottomPadding() {
    let mouseUpListener;
    this.updateBottomPaddingSubscription = this.gridItemDragged.subscribe(value => {
      if (value) {
        mouseUpListener = this.renderer.listen(
          this.elementRef.nativeElement,
          'mouseenter',
          event1 => {
            if (this.draggingItemBottom) {
              return;
            }
            const heightElement = (event1.currentTarget as HTMLElement).offsetHeight;
            const offsetY = event1.offsetY;
            const deviation = Math.abs(heightElement - offsetY);
            if (deviation <= 30) {
              this.draggingItemBottom = true;
              this.changeDetectorRef.detectChanges();
            }
          }
        );
      } else {
        this.draggingItemBottom = false;
        mouseUpListener();
      }
    });
  }
}
