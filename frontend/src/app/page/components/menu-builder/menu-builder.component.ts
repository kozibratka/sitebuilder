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
import {MatDialog} from "@angular/material/dialog";
import {SymfonyApiClientService} from "../../../core/services/api/symfony-api/symfony-api-client.service";
import {NotifierService} from "../../../core/services/notifier.service";
import {HttpResponseToasterService} from "../../../core/services/http-response-toaster.service";
import {RemoveItemComponent} from "../../../core/components/remove-item/remove-item.component";
import * as _ from 'lodash';

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  templateBlocksPerCategory = new Map<string, PageBlockInterface[]>();
  templateBlockCategory:string[] = [];
  selectedTemplateBlockCategory = '';
  selectedBlockTemplates: PageBlockInterface[] = [];
  showMoveIcon = false;
  @Output() private locketEmitter = new EventEmitter<boolean>();
  @Input() pageDetail: PageInterface;
  rows: GridRowInterface[] = [{cells: [{width: 6, items: []}, {width: 6, items: []}]}];

  constructor(
    public menuPluginResolverServices: MenuPluginResolverService,
    private zone: NgZone,
    private renderer: Renderer2,
    private window: Window,
    private userService: UserService,
    private applicationRef: ApplicationRef,
    private quickMenuService: QuickMenuService,
    private dialog: MatDialog,
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
    @Inject('SortableJsDragged') private sortableJsDragged$: Subject<boolean>,
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.initTemplateBlocks(this.pageDetail.webBlocks);
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
    return JSON.parse(JSON.stringify(item)); // this is what happens if sortablejsCloneFunction is not provided. Add your stuff here
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

  deleteTemplateBlock(block:  PageBlockInterface) {
    this.dialog.open(RemoveItemComponent, {data: { name: 'šablona bloku' }}).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      this.symfonyApiClientService.post('page_block_template_delete', {}, {id: block.id}).subscribe({
        next: () => {
          this.notifierService.notify('Šablona Bloku byla úspěšně smazána');
        },
        error: err => this.httpResponseToasterService.showError(err)
      });
    })
  }

  initTemplateBlocks(blocks: PageBlockInterface[]) {
    let categorySet = new Set<string>();
    blocks.forEach(value => {
      let category = value.category;
      if (!this.templateBlocksPerCategory.has(category.name)) {
        this.templateBlocksPerCategory.set(category.name, []);
      }
      this.templateBlocksPerCategory.get(category.name).push(value);
      categorySet.add(category.name);
    });
    this.templateBlockCategory = Array.from(categorySet).sort();
    this.changeSelectedTemplateBlocks(this.selectedTemplateBlockCategory);
  }

  changeSelectedTemplateBlocks(name) {
    this.selectedTemplateBlockCategory = name;
    if (!this.selectedTemplateBlockCategory.length) {
      this.selectedBlockTemplates = _.flatten([...this.templateBlocksPerCategory.values()]);
      this.selectedBlockTemplates.sort((a, b) => {
       return a.category.name.localeCompare(b.category.name);
      });
    }
    this.selectedBlockTemplates = this.templateBlocksPerCategory.get(this.selectedTemplateBlockCategory);
  }
}
