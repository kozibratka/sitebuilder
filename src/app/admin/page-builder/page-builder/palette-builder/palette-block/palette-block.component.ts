import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';
import {PaletteBlockGridstackService} from './services/palette-block-gridstack.service';
import {PaletteBlockGridstackItemDirective} from './directives/palette-block-gridstack-item.directive';

@Component({
  selector: 'app-palette-block',
  templateUrl: './palette-block.component.html',
  styleUrls: ['./palette-block.component.css'],
  viewProviders: [{provide: PaletteBlockGridstackService}]
})
export class PaletteBlockComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('palette_content') paletteContent: ElementRef;
  @ViewChild(PaletteBlockGridstackItemDirective) paletteBlockGridstackItemDirective: PaletteBlockGridstackItemDirective[];
  gridNodes: GridStackNode[] = [];

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService
  ) {
    let grd: GridStackNode = {x: 2, y: 2, width: 2, height: 1};
    this.gridNodes.push(grd);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.init(this.paletteContent, this.gridNodes);
  }

  ngAfterViewChecked(): void {
    console.log("checked");
    this.paletteBlockGridstackService.reinit();
  }
}
