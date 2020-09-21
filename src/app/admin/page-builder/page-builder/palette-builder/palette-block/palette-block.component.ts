import {Component, AfterViewInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList} from '@angular/core';
import {GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockGridstackService} from './services/palette-block-gridstack.service';
import {PaletteBlockGridstackItemDirective} from './directives/palette-block-gridstack-item.directive';

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
    private paletteBlockGridstackService: PaletteBlockGridstackService
  ) {
    let grd: GridStackNode = {x: 2, y: 2, width: 2, height: 1};
    this.gridNodes.push(grd);
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    this.resizeHorizontalPalette(event.offsetY);
  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes);
  }

  private resizeHorizontalPalette(offsetY: number): void{
    const actualHeight = this.paletteContent.nativeElement.offsetHeight;
    if (offsetY < actualHeight - 7) {
      return;
    }
    const paletteBlockGridstackItemDirectiveSorted = this.sortPaletteBlockGridstackItemDirective();
    const lastBottomPaletteBlockGridstackItemDirective = paletteBlockGridstackItemDirectiveSorted[0] ?? null;
    const mostBottomYInGrid = lastBottomPaletteBlockGridstackItemDirective ?
      lastBottomPaletteBlockGridstackItemDirective.getRowsInGrid() : 0;
  }

  sortPaletteBlockGridstackItemDirective(): PaletteBlockGridstackItemDirective[] {
    const paletteBlockGridstackItemDirectives = this.paletteBlockGridstackItemDirective.toArray();
    paletteBlockGridstackItemDirectives.sort((a, b) =>
      b.getRowsInGrid() - a.getRowsInGrid()
    );

    return paletteBlockGridstackItemDirectives;
  }
}
