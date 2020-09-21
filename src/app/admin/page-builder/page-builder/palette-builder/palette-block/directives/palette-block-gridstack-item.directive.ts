import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {PaletteBlockGridstackService} from '../services/palette-block-gridstack.service';
import {GridStackNode} from 'gridstack';

@Directive({
  selector: '[appPaletteBlockGridstackItem]'
})
export class PaletteBlockGridstackItemDirective implements OnInit, AfterViewInit {

  constructor(private paletteBlockGridstackService: PaletteBlockGridstackService, private elementRef: ElementRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.paletteBlockGridstackService.addWidget(this.elementRef);
  }

  getelementRef(): ElementRef {
    return this.elementRef;
  }

  getHeightInGrid(): number{
    return this.getelementRef().nativeElement.gridstackNode.height;
  }

  getYPositionInGrid(): number{
    return this.getelementRef().nativeElement.gridstackNode.y;
  }

  getRowsInGrid(): number {
    return this.getHeightInGrid() + this.getYPositionInGrid();
  }
}
