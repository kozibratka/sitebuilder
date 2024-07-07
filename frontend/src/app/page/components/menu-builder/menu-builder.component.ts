/// <reference types="jqueryui" />
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {PageBlockInterface} from '../../interfaces/page-block-interface';
import {Subject} from 'rxjs';
import {UserService} from "../../../authorization/services/user.service";
import {GridRowInterface} from "../../interfaces/grid-row-interface";
import {GridCellItemInterface} from "../../interfaces/grid-cell-item-interface";
import {PageInterface} from "../../interfaces/page-interface";
import {PageBlockTemplateService} from "../../services/page-block-template.service";
import {WebDetailResolverService} from "../../../web/services/web-detail-resolver.service";
import {DragStatusService} from "../../services/drag-status.service";
import {SortablejsModule} from "nxt-sortablejs";
import {MatIcon} from "@angular/material/icon";
import {
  AnimationHiderComponent
} from "../../../core/components/hidder/animation-hider/animation-hider/animation-hider.component";
import {MenuPluginResolverDirective} from "../../directives/menu-plugin-resolver.directive";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-builder',
  standalone: true,
  templateUrl: './menu-builder.component.html',
  imports: [
    CommonModule,
    SortablejsModule,
    MatIcon,
    AnimationHiderComponent,
    MenuPluginResolverDirective
  ],
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  showMoveIcon = false;
  @Output() private locketEmitter = new EventEmitter<boolean>();
  @Output() private dragMenuBlock$ = new EventEmitter<boolean>();
  @Input() pageDetail: PageInterface;
  rows: GridRowInterface[] = [{cells: [{width: 6, items: []}, {width: 6, items: []}]}];
  mouseOnNewRow = false;

  constructor(
    public menuPluginResolverServices: MenuPluginResolverService,
    private userService: UserService,
    public pageBlockTemplateService: PageBlockTemplateService,
    public webDetailResolverService: WebDetailResolverService,
    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    private dragStatusService: DragStatusService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.pageBlockTemplateService.initMenu(this.pageDetail.webBlocks);
  }

  onMousOver() {

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

  cloneSortableJsRow(item: any) {
    return {cells: [{width: 6, items: []}, {width: 6, items: []}]};
  }

  createPluginConfig = (item: any): GridCellItemInterface | GridRowInterface => {
    if (this.mouseOnNewRow) {
      return this.cloneSortableJsRow(item);
    }
    let resolver = this.menuPluginResolverServices.selectedAbstractPluginResolverMessenger;
    let pluginConfig = resolver.getEmptySettings();
    let res = {plugin: pluginConfig, itemOrder: 0};

    return res;
  }

  onDragStart = (event: any) => {
    this.dragStatusService.isDragMenuPlugin = true;
  }

  onDragEnd = (event: any)=> {
    this.dragStatusService.isDragMenuPlugin = false;
  }

  onDragStartBlock = (event: any) => {
    this.dragMenuBlock$.next(true);
  }

  onDragEndBlock = (event: any)=> {
    this.dragMenuBlock$.next(false);
  }
}
