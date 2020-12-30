import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {Subject} from 'rxjs';
import {GridItemHTMLElementItemComponent} from './tools/interfaces/grid-item-htmlelement-item-component';
import {PageInterface} from '../../tools/interfaces/page-interface';
import {PageBlockInterface} from './page-block/tools/interfaces/page-block-interface';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css'],
  providers: [{provide: 'QuickMenuMessenger', useFactory: () => new Subject<GridItemHTMLElementItemComponent>()}]
})
export class PaletteBuilderComponent implements OnInit, AfterViewChecked{

  @ViewChild('palette') private _palette: ElementRef<HTMLElement>;
  @Input() pageDetail: PageInterface;
  baseBlocks: PageBlockInterface[];
  isDraggedContent = false;
  private _isResized = false;

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.baseBlocks = this.pageDetail.pageBlocks;
  }

  ngAfterViewChecked(): void {

  }

  blockDragStart(): void {
    this.isDraggedContent = true;
  }

  blockDragStop(): void {
    this.isDraggedContent = false;
  }

  get palette(): ElementRef<HTMLElement> {
    return this._palette;
  }

  set palette(value: ElementRef<HTMLElement>) {
    this._palette = value;
  }

  get isResized(): boolean {
    return this._isResized;
  }

  set isResized(value: boolean) {
    this._isResized = value;
  }
}
