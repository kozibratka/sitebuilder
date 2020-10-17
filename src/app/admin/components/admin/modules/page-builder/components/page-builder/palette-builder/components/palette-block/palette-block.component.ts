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
  EventEmitter, Inject
} from '@angular/core';
import {GridItemHTMLElement, GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockGridstackService} from './tools/services/palette-block-gridstack.service';
import {PaletteBuilderComponent} from '../../palette-builder.component';
import {PaletteItemComponent} from './components/palette-item/palette-item.component';
import {Subject} from 'rxjs';
import {GridItemHTMLElementItemComponent} from '../../tools/interfaces/grid-item-htmlelement-item-component';

@Component({
  selector: 'app-palette-block',
  templateUrl: './palette-block.component.html',
  styleUrls: ['./palette-block.component.css'],
  viewProviders: [{provide: PaletteBlockGridstackService}]
})
export class PaletteBlockComponent implements AfterViewInit{

  @ViewChild('palette_content') paletteContent: ElementRef;
  @ViewChildren(PaletteItemComponent) paletteItemComponents: QueryList<PaletteItemComponent>;
  @Output() resized = new EventEmitter<boolean>();
  gridNodes: GridStackNode[] = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    @Inject('QuickMenuMessenger') private quickMenuMessenger: Subject<GridItemHTMLElementItemComponent>,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    this.prepareResizeHorizontalPalette(event);
  }

  ngAfterViewInit(): void {
    this.initGridStack();
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
        this.paletteBuilderComponent.palette.nativeElement,
        'mousemove',
        (event) => this.paletteBlockGridstackService.resizeHorizontalPalette(event)
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
      this.quickMenuMessenger.next(el as GridItemHTMLElementItemComponent);
    });
    this.paletteBlockGridstackService.gridStack.on('resizestop', (event: Event, el: GridItemHTMLElement) => {
      this.quickMenuMessenger.next(el as GridItemHTMLElementItemComponent);
    });

  }
}
