import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {AbstractAdminSetting} from '../../../../../../plugins/tools/abstract-class/abstract-admin-setting';
import {BasePlugSettingsinInterface} from '../../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';

@Component({
  selector: 'app-update-plugin',
  templateUrl: './update-plugin.component.html',
  styleUrls: ['./update-plugin.component.css']
})
export class UpdatePluginComponent implements OnInit {
  pluginResolver: AbstractMenuPluginResolver;
  @ViewChild('adminContent', {static: true, read: ViewContainerRef}) private destination: ViewContainerRef;
  pluginSetting: BasePlugSettingsinInterface;

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
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.pluginResolver.adminComponentsClass()[0].component);
      const instance = this.destination.createComponent<AbstractAdminSetting<any>>(factory).instance;
      instance.initForm(data.plugin);
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
