import {Component, AfterViewInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList, Renderer2, NgZone} from '@angular/core';
import {GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockGridstackService} from './services/palette-block-gridstack.service';
import {PaletteBlockGridstackItemDirective} from './directives/palette-block-gridstack-item.directive';
import {PaletteBuilderComponent} from '../palette-builder.component';

@Component({
  selector: 'app-palette-block',
  templateUrl: './palette-block.component.html',
  styleUrls: ['./palette-block.component.css'],
  viewProviders: [{provide: PaletteBlockGridstackService}]
})
export class PaletteBlockComponent implements AfterViewInit{

  @ViewChild('palette_content') paletteContent: ElementRef;
  @ViewChildren(PaletteBlockGridstackItemDirective) paletteBlockGridstackItemDirective: QueryList<PaletteBlockGridstackItemDirective>;
  gridNodes: GridStackNode[] = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
    let grd: GridStackNode = {x: 2, y: 2, width: 2, height: 1};
    this.gridNodes.push(grd);
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    this.prepareResizeHorizontalPalette(event);
  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes);
  }

  private prepareResizeHorizontalPalette(event: MouseEvent): void{
    const actualHeight = this.paletteContent.nativeElement.offsetHeight;
    if (event.offsetY < actualHeight - 7) {
      return;
    }
    this.paletteBlockGridstackService.prepareResizeHorizontalPalette(this.paletteBlockGridstackItemDirective.toArray(), event);
    let resizeMouseMovePaletteListener: () => void;
    this.ngZone.runOutsideAngular(() => {
      resizeMouseMovePaletteListener = this.renderer.listen(
        this.paletteBuilderComponent.palette.nativeElement,
        'mousemove',
        (event) => this.paletteBlockGridstackService.resizeHorizontalPalette(event)
      );
    });
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      resizeMouseMovePaletteListener();
      mouseUpListener();
    });

  }
}
