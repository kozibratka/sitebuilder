import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageBlockInterface} from '../../../interfaces/page-block-interface';
import {StringService} from '../../../../core/services/string.service';
import {GridRowInterface} from "../../../interfaces/grid-row-interface";
import {SortablejsModule} from "nxt-sortablejs";
import {GridCellInterface} from "../../../interfaces/grid-cell-interface";
import {UserService} from "../../../../authorization/services/user.service";
import {PageBlockTemplateService} from "../../../services/page-block-template.service";
import {MoveableModalService} from "../../../../core/components/moveable-modal/services/moveable-modal.service";
import {BlockAppearanceComponent} from "../admin/block-appearance/block-appearance.component";
import {MiniAdminComponent} from "../../../../core/components/mini-admin/mini-admin.component";
import {
  AdminSettingAbleInterface
} from "../../../../core/components/mini-admin/tools/interfaces/admin-setting-able-interface";
import {BlockDimensionComponent} from "../admin/block-dimension/block-dimension.component";
import {UrlService} from "../../../../core/services/url.service";
import {DragStatusService} from "../../../services/drag-status.service";
import {
  AnimationHiderComponent
} from "../../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GridRowComponent} from "../../grid-row/grid-row.component";
import {MatMenu, MatMenuContent, MatMenuTrigger} from "@angular/material/menu";
import {MenuNewRowComponent} from "../../menu-new-row/menu-new-row.component";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-palette-block',
  standalone: true,
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.css'],
  imports: [
    CommonModule,
    AnimationHiderComponent,
    MatIconButton,
    MatIcon,
    GridRowComponent,
    MatMenuTrigger,
    MatMenu,
    MenuNewRowComponent,
    SortablejsModule,
    MatTooltip,
    MatMenuContent
  ]
})
export class PageBlockComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked{
  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef<HTMLElement>;
  @ViewChild('video') video: ElementRef<HTMLElement>;
  @Output() resized = new EventEmitter<boolean>();
  private _pageBlock: PageBlockInterface;
  hoverOnIndexRow: number = null;
  showMoveIcon: boolean;
  isMoveMenuHover = false;
  @Output() deleteBlock = new EventEmitter<boolean>();
  public videoUrl = '';

  constructor(
    public elementRef: ElementRef,
    public userService: UserService,
    public pageBlockTemplateService: PageBlockTemplateService,
    private moveableModalService: MoveableModalService,
    public videoService: UrlService,
    private changeDetectorRef: ChangeDetectorRef,
    private dragStatusService: DragStatusService,
  ) {
  }

  ngOnInit(): void {
    this.initVideoUrl();
  }

  ngAfterViewInit(): void {
    this.startVideo();
  }

  ngAfterViewChecked(): void {
  }


  ngOnDestroy() {
    this.destroyVideo();
  }

  @HostListener('mousedown', ['$event']) onClick(event: MouseEvent): void {
    // this.prepareResizeHorizontalPalette(event);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent): void {
    this.showMoveIcon = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent): void {
    this.showMoveIcon = false;
  }

  trackByRows(index, item: GridRowInterface) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }
  get pageBlock(): PageBlockInterface {
    return this._pageBlock;
  }
  @Input()
  set pageBlock(value: PageBlockInterface) {
    this._pageBlock = value;
    //this.paletteBlockGridstackService.gridStackNodes = this._pageBlock.paletteGridItems;
  }

  onDragStart = (event: any) => {
    this.dragStatusService.isDragRow = true;
  }

  onDragEnd = (event: any)=> {
    this.dragStatusService.isDragRow = false;
  }

  removeRow(index:number) {
    this.pageBlock.rows.splice(index, 1);
  }

  addRow(num: number, index: number = null){
    let newRow: GridRowInterface = {cells: []};
    let newCells: GridCellInterface[] = [];
    if (num === 5) {
      newCells = [{items: [], width: 2}, {items: [], width: 2}, {items: [], width: 4}, {items: [], width: 2}, {items: [], width: 2}];
    } else if(num === 7) {
      newCells = [{items: [], width: 1}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 1}];
    }
    else if(num === 8) {
      newCells = [{items: [], width: 1}, {items: [], width: 1}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 1}, {items: [], width: 1}];
    }
    else if(num === 9) {
      newCells = [{items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}];
    }
    else if(num === 10) {
      newCells = [{items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 2}, {items: [], width: 2}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}];
    }
    else if(num === 11) {
      newCells = [{items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 2}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}, {items: [], width: 1}];
    }else {
      let width = Math.floor(12/num);
      for (let i = 0; i < num; i++) {
        let widthForColumn = width;
        if (12 % num && i == num-1) {
          widthForColumn = 12 - ((i) * width);
        }
        newCells.push({items: [], width: widthForColumn});
      }
    }
    newRow.cells = newCells;
    if (index !== null) {
      this.pageBlock.rows.splice(index, 0, newRow);
    } else {
      this.pageBlock.rows.push(newRow);
    }
  }

  openSettings() {
    let settings: AdminSettingAbleInterface = {
      settings: this.pageBlock,
      contextObject: this,
      adminComponentsClass: [
        {component: BlockAppearanceComponent, label: 'Pozadí'},
        {component: BlockDimensionComponent, label: 'Rozměry'}
      ]
    };

    this.moveableModalService.show(MiniAdminComponent, settings, 'Nastavení bloku');
  }

  initVideoUrl() {
    if (this.pageBlock.backgroundVideo) {
      this.videoUrl = this.videoService.getYoutubeVideoUrl(this.pageBlock.backgroundVideo);
    }
  }

  changeVideo(url: string = '') {
    if (url) {
      this.pageBlock.backgroundVideo = url;
      this.initVideoUrl();
    }
    if (this.videoUrl) {
      if (!this.video) {
        this.changeDetectorRef.detectChanges();
      }
      this.startVideo();
    }
  }

  startVideo() {
    if (this.videoUrl) {
      if (!(window as any).hasOwnProperty('VIDEO_BACKGROUNDS')) {
        (jQuery(this.video.nativeElement.firstElementChild) as any).youtube_background();
      } else {
        (window as any).VIDEO_BACKGROUNDS.add(this.video.nativeElement.firstElementChild);
      }
    }
  }

  destroyVideo() {
    if (this.pageBlock.backgroundVideo) {
      (window as any).VIDEO_BACKGROUNDS.destroy(this.video.nativeElement.firstElementChild);
      this.pageBlock.backgroundVideo = '';
      this.videoUrl = '';
    }
  }

  getStyles() {
    let style = {};
    if (this._pageBlock.paddingTop) {
      style['paddingTop'] = this._pageBlock.paddingTop+'px';
    }
    if (this._pageBlock.paddingBottom) {
      style['paddingBottom'] = this._pageBlock.paddingBottom+'px';
    }
    return style;
  }
}
