/// <reference types="jqueryui" />
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {PageBlockInterface} from '../../interfaces/page-block-interface';
import {Subject} from 'rxjs';
import {QuickMenuService} from '../../services/quick-menu.service';
import {UserService} from "../../../authorization/services/user.service";
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {PageInterface} from "../../interfaces/page-interface";
import {PageBlockTemplateService} from "../../services/page-block-template.service";
import {WebDetailResolverService} from "../../../web/services/web-detail-resolver.service";

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  showMoveIcon = false;
  @Output() private locketEmitter = new EventEmitter<boolean>();
  @Output() private dragMenuBlock$ = new EventEmitter<boolean>();
  @Input() pageDetail: PageInterface;
  rows: GridRowInterface[] = [{cells: [{width: 6, items: []}, {width: 6, items: []}]}];

  constructor(
    public menuPluginResolverServices: MenuPluginResolverService,
    private renderer: Renderer2,
    private window: Window,
    private userService: UserService,
    private applicationRef: ApplicationRef,
    private quickMenuService: QuickMenuService,
    public pageBlockTemplateService: PageBlockTemplateService,
    public webDetailResolverService: WebDetailResolverService,
    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    @Inject('SortableJsDragged') private sortableJsDragged$: Subject<boolean>,
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.pageBlockTemplateService.refreshMenu(this.pageDetail.webBlocks);
  }

  onMousOver() {

  }

  myClone(event) {
    this.quickMenuService.moveMenu.next(false);
    this.gridItemDragged.next(true);
    const el = (event.target as Node).parentNode.cloneNode(true);
    const mouseUpListener = this.renderer.listen(this.window, 'mouseup', () => {
      this.quickMenuService.moveMenu.next(true);
      mouseUpListener();
      this.gridItemDragged.next(false);
      this.applicationRef.tick();
    });
    return el;
  }

  clonePageBlock = (item: PageBlockInterface) => {
    let cloneItem = {...item, isFromTemplateBlock: true}
    return JSON.parse(JSON.stringify(cloneItem));
  }

  get locked(): boolean {
    return this.userService.settings.lockBuilderMenu;
  }

  set locked(value: boolean) {
    this.userService.settings.lockBuilderMenu = value;
    this.locketEmitter.emit(value)
  }

  cloneSortableJsRow(item) {
    return {cells: [{width: 6, items: []}, {width: 6, items: []}]};
  }

  createPluginConfig = (item): GridCellItemInterface => {
    let resolver = this.menuPluginResolverServices.selectedAbstractPluginResolverMessenger;
    let pluginConfig = resolver.getEmptySettings();
    return {plugin: pluginConfig, itemOrder: 0};
  }

  onDragStart = (event: any) => {
    this.sortableJsDragged$.next(true);
  }

  onDragEnd = (event: any)=> {
    this.sortableJsDragged$.next(false);
  }

  onDragStartBlock = (event: any) => {
    this.dragMenuBlock$.next(true);
  }

  onDragEndBlock = (event: any)=> {
    this.dragMenuBlock$.next(false);
  }
}
