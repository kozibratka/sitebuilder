import {AfterViewChecked, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {PageInterface} from '../../interfaces/page-interface';
import {PageBlockInterface} from '../../interfaces/page-block-interface';
import {StringService} from '../../../core/services/string.service';
import {Subject} from "rxjs";
import {LinkDeactivateService} from "../../../core/services/link-deactivate.service";
import {DragStatusService} from "../../services/drag-status.service";

@Component({
  selector: 'app-palette-builder',
  templateUrl: './palette-builder.component.html',
  styleUrls: ['./palette-builder.component.css'],
})
export class PaletteBuilderComponent implements OnInit, AfterViewChecked{

  @ViewChild('palette') private _palette: ElementRef<HTMLElement>;
  @Input() pageDetail: PageInterface;
  @Input() menuBlocDragged: boolean;
  private _isResized = false;

  constructor(
    public dragStatusService: DragStatusService,
    private linkDeactivateService: LinkDeactivateService,
  ) {
  }

  ngOnInit(): void {
    this.linkDeactivateService.deactivate = true;
  }

  ngAfterViewChecked(): void {
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

  deleteBlock(i: number) {
    this.pageDetail.pageBlocks.splice(i, 1);
  }
}
