/// <reference types="jqueryui" />
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  EventEmitter,
  Inject,
  NgZone,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {PageBlockInterface} from '../../interfaces/page-block-interface';
import {GridStack} from 'gridstack/dist/gridstack';
import {Subject} from 'rxjs';
import {QuickMenuService} from '../../services/quick-menu.service';
import {UserService} from "../../../authorization/services/user.service";

@Component({
  selector: 'app-menu-builder',
  templateUrl: './menu-builder.component.html',
  styleUrls: ['./menu-builder.component.css']
})
export class MenuBuilderComponent implements OnInit, AfterViewInit {

  baseBlocks: { image: string, id: number }[];
  showMoveIcon = false;
  @Output() private locketEmitter = new EventEmitter<boolean>();
  rows = [1];

  constructor(
    public menuPluginResolverServices: MenuPluginResolverService,
    private zone: NgZone,

    private renderer: Renderer2,
    private window: Window,
    private userService: UserService,
    private applicationRef: ApplicationRef,
    private quickMenuService: QuickMenuService,
    @Inject('GridItemDragged') private gridItemDragged: Subject<boolean>,
  ) {
    this.baseBlocks = [
      {image: 'https://via.placeholder.com/300/000000?text=2', id: 1}
    ];
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      GridStack.setupDragIn('.grid-stack-item-menu', { handle: '.icon-move', appendTo: 'body', helper: this.myClone.bind(this) });
    });
  }

  ngOnInit(): void {

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

  clonePageBlock = (item) => {
    const pageBlock: PageBlockInterface = {height: 20, paletteGridItems: [], uniqueId: ''};
    return pageBlock; // this is what happens if sortablejsCloneFunction is not provided. Add your stuff here
  }

  get locked(): boolean {
    return this.userService.settings.lockBuilderMenu;
  }

  set locked(value: boolean) {
    this.userService.settings.lockBuilderMenu = value;
    this.locketEmitter.emit(value)
  }
}
