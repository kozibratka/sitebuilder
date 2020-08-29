import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {GridStack, GridStackNode} from 'gridstack/dist/gridstack';

@Component({
  selector: 'app-palette-block',
  templateUrl: './palette-block.component.html',
  styleUrls: ['./palette-block.component.css']
})
export class PaletteBlockComponent implements OnInit, AfterViewInit {

  @ViewChild('palette_content') paletteContent: ElementRef;
  private gridStack: GridStack;
  gridNodes: GridStackNode[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.reinitGridStack();
  }

  reinitGridStack(): void {
    this.gridStack = GridStack.init({acceptWidgets: true, column: 12, float: true}, this.paletteContent.nativeElement);
    (this.gridStack as any).on('dropped', (event: Event, arg2: any, arg3: any) => {
      this.gridStack.removeWidget(arg3.el);
      this.reinitDropedPlugin(arg3);
    });
  }

  reinitDropedPlugin(gridStackNode: GridStackNode): void {
    this.gridNodes.push(gridStackNode);
    this.reinitGridStack();
  }

}
