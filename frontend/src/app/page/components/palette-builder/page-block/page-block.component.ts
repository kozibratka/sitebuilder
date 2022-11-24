import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
  ViewChildren,
  QueryList,
  Renderer2,
  NgZone,
  Output,
  EventEmitter, Inject, Input, OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {GridItemHTMLElement, GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBuilderComponent} from '../palette-builder.component';
import {PaletteItemComponent} from './palette-item-component/palette-item.component';
import {Subject} from 'rxjs';
import {PageBlockInterface} from '../../../interfaces/page-block-interface';
import {GridItemHTMLElementItemComponent} from '../../../interfaces/grid-item-htmlelement-item-component';
import {PaletteItemConfig} from '../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../services/palette-block-gridstack.service';

@Component({
  selector: 'app-palette-block',
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.css'],
  viewProviders: [{provide: PaletteBlockGridstackService}]
})
export class PageBlockComponent implements OnInit, AfterViewInit{

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef;
  @ViewChildren(PaletteItemComponent) paletteItemComponents: QueryList<PaletteItemComponent>;
  @Output() resized = new EventEmitter<boolean>();
  @Input() pageBlock: PageBlockInterface;
  gridNodes: PaletteItemConfig[] = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    @Inject(DOCUMENT) private document: Document,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
  }

  ngOnInit(): void {
    if (this.pageBlock.paletteGridItems) {
      this.gridNodes = this.pageBlock.paletteGridItems;
    }
    this.initGridStack();
  }

  ngAfterViewInit(): void {
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    this.prepareResizeHorizontalPalette(event);
  }

  private prepareResizeHorizontalPalette(event: MouseEvent): void{
    const actualHeight = this.paletteContent.nativeElement.offsetHeight;
    if (event.offsetY < actualHeight - 7) {
      return;
    }
    this.resized.emit(true);
    this.paletteBlockGridstackService.prepareResizeHorizontalPalette(this.paletteItemComponents.toArray(), event);
    let resizeMouseMovePaletteListener: () => void;
    this.ngZone.runOutsideAngular(() => {
      resizeMouseMovePaletteListener = this.renderer.listen(
        this.document,
        'mousemove',
        (mouseEvent) => this.paletteBlockGridstackService.resizeHorizontalPalette(mouseEvent)
      );
    });
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      this.resized.emit(false);
      resizeMouseMovePaletteListener();
      mouseUpListener();
    });

  }

  private initGridStack(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes);
    this.paletteBlockGridstackService.gridStack.on('dragstop', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuMessenger.next(null);
    });
    this.paletteBlockGridstackService.gridStack.on('resizestop', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuMessenger.next(null);
    });

  }
}
