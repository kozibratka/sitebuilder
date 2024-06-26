import {AfterViewChecked, Component, ElementRef, HostBinding, Inject, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {PageInterface} from '../../interfaces/page-interface';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {MiniAdminComponent} from '../../../core/components/mini-admin/mini-admin.component';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {SystemInfoService} from '../../../core/services/system-info.service';
import {Title} from '@angular/platform-browser';
import {Subject, Subscription, timer} from 'rxjs';
import {BasePlugConfigInterface} from '../../../plugins/interfaces/base-plug-config-interface';
import {PaletteBlockService} from '../../services/palette-block.service';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../../authorization/services/user.service";

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService,
    {provide: 'PageBuilderEvent', useFactory: () => new Subject<boolean>()},
    {provide: 'GridItemDragged', useFactory: () => new Subject<boolean>()}
  ],
  animations: [
    trigger('visibleMenu', [
      state('show', style({left: '235px'})),
      state('hide', style({left: '-40px'})),
      transition('show => hide', [
        animate('0.15s')
      ]),
      transition('hide => show', [
        animate('0.15s')
      ]),
    ])
  ]
})
export class PageBuilderComponent implements OnInit, AfterViewChecked {

  @ViewChild(MiniAdminComponent, {static: true}) miniAdmin: MiniAdminComponent;
  // @ViewChild(MouseMoveScrollDirective, {static: true}) mouseMoveScrollDirective: MouseMoveScrollDirective;
  pageDetail: PageInterface;
  globalPlugins: BasePlugConfigInterface[] = [];
  globalPluginsSelect = [];
  @HostBinding('style.minHeight')minHeight = '0px';
  mouseOnMenu = true;
  isSortableJsDragged = false;
  menuBlockDragged = false;

  constructor(
    private route: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
    private domainInfoService: SystemInfoService,
    public title: Title,
    public elementRef: ElementRef<HTMLElement>,
    private userService: UserService,

    private paletteBlockService: PaletteBlockService,
    @Inject('PageBuilderEvent') private pageBuilderEvent: Subject<boolean>,

    @Inject('GridItemDragged') public gridDragged$: Subject<boolean>,
  ) {
  }

  ngAfterViewChecked(): void {

  }

  ngOnInit(): void {
    this.title.setTitle('Vytvoření stránky');
    this.pageDetail = this.route.snapshot.data.pageDetail as PageInterface;
    this.globalPlugins = this.pageDetail.globalPlugins ?? [];
    this.registerResizedBlockListenerOnDragged();
    this.closeMenuOnLoad();
    // this.fileManagerModalService.open();
  }

  save(withPublic = null): void {
    this.pageBuilderEvent.next(true); // notify listeners
    this.symfonyApiClientService.post<PageInterface>('page_update_page_builder', this.pageDetail, {id: this.pageDetail.id, withPublic}).subscribe({
      next: (response) => {
        this.pageDetail = response.body;
        // ArrayHelper.syncArrayOfObjects(response.body.pageBlocks, this.pageDetail.pageBlocks); // refresh blocks, items...
        this.webDetailResolverService.refresh();
        this.notifierService.notify('Úpravy byly úspěšně uloženy');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  preview(): void {
    this.pageBuilderEvent.next(true); // notify listeners
    const previewPageData = {...this.pageDetail, isPreview: true, globalPlugins: null};
    this.symfonyApiClientService.post<{ hash: string }>('page_create_preview', previewPageData, {id: this.webDetailResolverService.selectedId}).subscribe({
      next: (response) => {
        const redirectUrl = this.domainInfoService.getPreviewHostname() + `/${this.pageDetail.url}?webId=${this.webDetailResolverService.selectedId}`;
        window.open('http://' + redirectUrl, '_blank');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }
  registerResizedBlockListenerOnDragged() {
    let isDraggedSubscription: Subscription;
    this.gridDragged$.subscribe(dragged => {
      if (dragged) {
        isDraggedSubscription = this.paletteBlockService.isResized$.subscribe(value => {
          if (this.elementRef.nativeElement.offsetHeight > parseInt(this.minHeight, 10)) {
            this.minHeight = this.elementRef.nativeElement.offsetHeight.toString() + 'px';
          }
        });
      } else if (isDraggedSubscription) {
        isDraggedSubscription.unsubscribe();
        this.minHeight = '0px';
      }
    });

  }

  refreshGlobalPluginSelect(identifier: string) {
    this.globalPluginsSelect = this.globalPlugins.filter(value => value.identifier === identifier);
  }

  onMouseEnter() {
    this.mouseOnMenu = true;
  }

  onMouseLeave() {
    this.mouseOnMenu = false;
  }

  getMenuState() {
    if (!this.userService.settings.lockBuilderMenu) {
      if (this.mouseOnMenu) {
        return 'show';
      }
      return 'hide';
    }
    return null;
  }

  closeMenuOnLoad() {
    if (!this.userService.settings.lockBuilderMenu) {
      timer(500).subscribe(value => {
        this.mouseOnMenu = false;
      });
    }
  }

  get menuLocked(): boolean {
    return this.userService.settings.lockBuilderMenu;
  }

  set menuLocked(value: boolean) {
    this.userService.settings.lockBuilderMenu = value;
    this.userService.update();
    (window as any).dispatchEvent(new Event('resize'));

  }
}
