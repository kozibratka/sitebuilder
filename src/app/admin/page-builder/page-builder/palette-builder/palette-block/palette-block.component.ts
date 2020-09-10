import {Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
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
  @ViewChild(PaletteBlockGridstackItemDirective) paletteBlockGridstackItemDirective: PaletteBlockGridstackItemDirective[];
  gridNodes: GridStackNode[] = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService
  ) {
    let grd: GridStackNode = {x: 2, y: 2, width: 2, height: 1};
    this.gridNodes.push(grd);
  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes);
  }
}
