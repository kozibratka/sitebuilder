import {
  AfterViewInit, ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone, OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {GridItemHTMLElement} from 'gridstack/dist/gridstack';
import {PaletteBuilderComponent} from '../../palette-builder/palette-builder.component';
import {PaletteItemComponent} from '../../palette-builder/page-block/palette-item-component/palette-item.component';
import {Subject, Subscription} from 'rxjs';
import {PageBlockInterface} from '../../../interfaces/page-block-interface';
import {PaletteItemConfig} from '../../../interfaces/palette-item-config';
import {PaletteBlockGridstackService} from '../../../services/palette-block-gridstack.service';
import {QuickMenuService} from '../../../services/quick-menu.service';
import {AbstractPlugin} from '../../../../plugins/abstract-class/abstract-plugin';
import {BasePlugConfigInterface} from '../../../../plugins/interfaces/base-plug-config-interface';
import {PaletteBlockService} from '../../../services/palette-block.service';
import {StringService} from '../../../../core/services/string.service';
import {GridRowInterface} from "../../../interfaces/grid-row-interface";
import {SortablejsDirective} from "ngx-sortablejs";
import {GridCellInterface} from "../../../interfaces/grid-cell-interface";
import {UserService} from "../../../../authorization/services/user.service";
import {PageBlockTemplateService} from "../../../services/page-block-template.service";

@Component({
  selector: 'app-palette-block',
  templateUrl: './page-block.component.html',
  styleUrls: ['./page-block.component.css'],
})
export class PageBlockComponent implements OnInit, AfterViewInit, OnDestroy{
  static BLOCK__TEMPLATE_UPDATED = 'BLOCK__TEMPLATE_UPDATED';

  @ViewChild('palette_content', {static: true}) paletteContent: ElementRef<HTMLElement>;
  @ViewChildren(PaletteItemComponent) paletteItemComponents: QueryList<PaletteItemComponent>;
  @ViewChild(SortablejsDirective, {static: true}) sortablejs: SortablejsDirective;
  @Output() resized = new EventEmitter<boolean>();
  private _pageBlock: PageBlockInterface;
  draggingItemBottom = false;
  updateBottomPaddingSubscription: Subscription;
  private itemStatesBeforeDragging = new Map<AbstractPlugin<any>, BasePlugConfigInterface>();
  hoverOnIndexRow: number = null;
  showMoveIcon: boolean;
  isMoveMenuHover = false;
  @Output() deleteBlock = new EventEmitter<boolean>();

  constructor(
    private paletteBlockGridstackService: PaletteBlockGridstackService,
    private changeDetectorRef: ChangeDetectorRef,
    private applicationRef: ApplicationRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private window: Window,
    private quickMenuService: QuickMenuService,
    public elementRef: ElementRef,
    private paletteBlockService: PaletteBlockService,
    public userService: UserService,
    public pageBlockTemplateService: PageBlockTemplateService,

    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    @Inject('SortableJsDragged') private sortableJsDragged$: Subject<boolean>,
    @Inject(DOCUMENT) private document: Document,
    private paletteBuilderComponent: PaletteBuilderComponent
  ) {
  }

  ngOnInit(): void {
    // this.initGridStack();
    // this.registerOnDraggedItem();
    // this.registerIsResizedOnDrag();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
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

  trackByGridItem(index, item: PaletteItemConfig ) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }

  trackByRows(index, item: GridRowInterface) {
    if (!item.uniqueId) {
      item.uniqueId = StringService.randomString();
    }
    return( item.uniqueId );
  }

  private prepareResizeHorizontalPalette(event: MouseEvent): void{
    const actualHeight = this.paletteContent.nativeElement.offsetHeight;
    if (event.offsetY < actualHeight - 7) {
      return;
    }
    this.resized.emit(true);
    this.paletteBlockGridstackService.
    prepareResizeHorizontalPalette(this.paletteItemComponents.toArray(), event, this.paletteContent.nativeElement);
    let resizeMouseMovePaletteListener: () => void;
    this.ngZone.runOutsideAngular(() => {
      resizeMouseMovePaletteListener = this.renderer.listen(
        this.document,
        'mousemove',
        (mouseEvent) => this.paletteBlockGridstackService.
        resizeHorizontalPalette(mouseEvent, this.paletteContent.nativeElement, this._pageBlock)
      );
    });
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      this.resized.emit(false);
      resizeMouseMovePaletteListener();
      mouseUpListener();
    });

  }


  private registerOnDraggedItem() {
    this.updateBottomPaddingSubscription = this.gridItemDragged.subscribe(value => {
      if (value) {
        this.draggingItemBottom = true;
        this.enableDisablePlugins(true);
      } else {
        this.enableDisablePlugins(false);
        this.draggingItemBottom = false;
      }
    });
  }

  private enableDisablePlugins(disable = true) {
    if (disable) {
      this.itemStatesBeforeDragging.clear();
      this.paletteItemComponents.forEach(item => {
        const plugin = item.componentRef.instance;
        this.itemStatesBeforeDragging.set(plugin, {...plugin.settings});
        const offState = item.componentRef.instance.getDisabledStateWhenDraggingItem();
        Object.assign(plugin.settings, offState);

      });
    } else {
      this.itemStatesBeforeDragging.forEach((settings, plugin) => {
        Object.assign(plugin.settings, settings);
      });
    }

    this.draggingItemBottom = true;
    this.changeDetectorRef.detectChanges();
  }
  private registerIsResizedOnDrag() {
    let sizeObserver;
    this.gridItemDragged.subscribe(value => {
      if (value) {
        sizeObserver = new ResizeObserver((entries) => {
          this.paletteBlockService.isResized$.next(true);
        });
        sizeObserver.observe(this.paletteContent.nativeElement);
      } else {
        sizeObserver.unobserve(this.paletteContent.nativeElement);
      }
    });
  }
  get pageBlock(): PageBlockInterface {
    return this._pageBlock;
  }
  @Input()
  set pageBlock(value: PageBlockInterface) {
    this._pageBlock = value;
    //this.paletteBlockGridstackService.gridStackNodes = this._pageBlock.paletteGridItems;
  }
  removeGridItem(paletteItemComponent: PaletteItemComponent) {
    // const index = this._pageBlock.paletteGridItems.indexOf(paletteItemComponent.gridItemConfig);
    // if (index !== -1) {
    //   this._pageBlock.paletteGridItems.splice(index, 1);
    // }
  }

  onDragStart = (event: any) => {
    this.sortableJsDragged$.next(true);
  }

  onDragEnd = (event: any)=> {
    this.sortableJsDragged$.next(false);
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
}
