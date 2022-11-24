import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {MenuPluginResolverService} from '../../services/menu-plugin-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {PageInterface} from '../../interfaces/page-interface';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {MiniAdminComponent} from '../../../core/components/mini-admin/mini-admin.component';
import {MoveableModalComponent} from '../../../core/components/moveable-modal/moveable-modal.component';
import {BasePlugConfigInterface} from '../../../plugins/tools/interfaces/base-plug-config-interface';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {ArrayHelper} from '../../../core/helpers/array-helper';
import {PluginResolverService} from '../../../plugins/tools/services/plugin-resolver.service';
import {NotifierService} from '../../../core/services/notifier.service';
import {DomainInfoService} from '../../../core/services/domain-info.service';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css'],
  providers: [
    MenuPluginResolverService
  ]
})
export class PageBuilderComponent implements OnInit, AfterViewChecked {

  @ViewChild(MiniAdminComponent, {static: true}) miniAdmin: MiniAdminComponent;
  @ViewChild(MoveableModalComponent, {static: true}) moveableModalComponent: MoveableModalComponent;
  pageDetail: PageInterface;
  globalPlugins: BasePlugConfigInterface[] = [];
  globalPluginsSelect = [];

  constructor(
    private route: ActivatedRoute,
    private symfonyApiClientService: SymfonyApiClientService,
    private notifierService: NotifierService,
    private httpResponseToasterService: HttpResponseToasterService,
    private webDetailResolverService: WebDetailResolverService,
    private pluginResolverService: PluginResolverService,
    private domainInfoService: DomainInfoService
  ) {
  }

  ngAfterViewChecked(): void {
    if (this.miniAdmin.settings) {
      const pluginIdentifier = (this.miniAdmin.settings as BasePlugConfigInterface).identifier;
      const pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(pluginIdentifier);
    }

  }

  ngOnInit(): void {
    this.pageDetail = this.route.snapshot.data.pageDetail as PageInterface;
    this.globalPlugins = this.pageDetail.globalPlugins ?? [];
  }

  save(): void {
    this.symfonyApiClientService.post<PageInterface>('page_update', this.pageDetail, {id: this.pageDetail.id}).subscribe({
      next: (response) => {
        ArrayHelper.syncArrayOfObjects(response.body.pageBlocks, this.pageDetail.pageBlocks); // refresh blocks, items...
        this.webDetailResolverService.refresh();
        this.notifierService.notify('Úpravy byly úspěšně uloženy');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  preview(): void {
    const previewPageData = {...this.pageDetail, isPreview: true, globalPlugins: null};
    this.symfonyApiClientService.post<{hash: string}>('page_create_preview', previewPageData, {id: this.webDetailResolverService.selectedId}).subscribe({
      next: (response) => {
        const redirectUrl = this.domainInfoService.getPreviewHostname() + `/${this.pageDetail.url}?webId=${this.webDetailResolverService.selectedId}`;
        window.open(redirectUrl, '_blank');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

  refreshGlobalPluginSelect(identifier: string) {
    this.globalPluginsSelect = this.globalPlugins.filter(value => value.identifier === identifier);
  }

  initSettingsFromSelect(globalPlugin?: BasePlugConfigInterface) {
    if (globalPlugin) {
      Object.assign(this.miniAdmin.settings, globalPlugin);
    } else {
      (this.miniAdmin.settings as BasePlugConfigInterface).id = null;
    }
  }

}
