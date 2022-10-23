import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {AbstractPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';
import {BasePlugConfigInterface} from '../../../../../../plugins/tools/interfaces/base-plug-config-interface';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';
import {MiniAdminComponent} from '../../../../../../shared/core/components/mini-admin/mini-admin.component';

@Component({
  selector: 'app-update-plugin',
  templateUrl: './update-plugin.component.html',
  styleUrls: ['./update-plugin.component.css']
})
export class UpdatePluginComponent implements OnInit {
  pluginResolver: AbstractPluginResolver;
  @ViewChild('miniAdmin', {read: MiniAdminComponent}) private miniAdmin: MiniAdminComponent;
  pluginSetting: BasePlugConfigInterface;

  constructor(
    private route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private resolver: ComponentFactoryResolver,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pluginSetting = data.plugin;
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(data.plugin.identifier);
      this.miniAdmin.setAdminAble(this.pluginResolver, data.plugin);
    });
  }

  onSubmit() {
    this.symfonyApiClientService.post('plugin_update', this.pluginSetting, {id: this.pluginSetting.id}).subscribe({
      next: () => {
        this.notifierService.notify('Plugin byl úspěšně upraven');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

}
