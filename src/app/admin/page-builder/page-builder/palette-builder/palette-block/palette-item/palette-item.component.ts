import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {GridStackNode} from 'gridstack';
import {PaletteBlockGridstackService} from '../services/palette-block-gridstack.service';

@Component({
  selector: 'app-palette-item',
  templateUrl: './palette-item.component.html',
  styleUrls: ['./palette-item.component.css']
})
export class PaletteItemComponent implements OnInit, AfterViewInit {

  @Input() gridStackNode: GridStackNode;

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
