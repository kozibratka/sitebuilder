import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PageInterface} from '../../interfaces/page-interface';
import {PageBlockInterface} from '../../interfaces/page-block-interface';
import {StringService} from '../../../core/services/string.service';

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css'],
})
export class PaletteBuilderComponent implements OnInit, AfterViewChecked{

  @ViewChild('palette') private _palette: ElementRef<HTMLElement>;
  @Input() pageDetail: PageInterface;
  @Input() isSortableJsDragged = false;
  isDraggedContent = false;
  private _isResized = false;

  constructor(
  ) {
  }

  ngOnInit(): void {
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

  trackByBlock(index, item: PageBlockInterface ) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }
}
