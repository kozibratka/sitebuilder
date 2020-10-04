import {AfterViewChecked, Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {Subject} from 'rxjs';
import {GridItemHTMLElementItemComponent} from './interfaces/grid-item-htmlelement-item-component';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css'],
  providers: [{provide: 'QuickMenuMessenger', useFactory: () => new Subject<GridItemHTMLElementItemComponent>()}]
})
export class PaletteBuilderComponent implements AfterViewChecked{

  @ViewChild('palette') private _palette: ElementRef<HTMLElement>;
  baseBlocks: { image: string, id: number }[];
  isDraggedContent = false;
  private _isResized = false;

  constructor(
  ) {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
      {image: 'https://via.placeholder.com/300/000458?text=2', id: 1},
    ];
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
