import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';
import {WebDetailResolverService} from '../../../tools/route-resolvers/web-detail-resolver.service';
import {MiniAdminComponent} from '../../../../../../shared/core/components/mini-admin/mini-admin.component';
import {PluginFormService} from './tools/form/plugin-form.service';
import {FormGroup} from '@angular/forms';
import {SymfonyApiClientService} from '../../../../../../shared/core/services/api/symfony-api/symfony-api-client.service';
import {NotifierService} from '../../../../../../shared/core/services/notifier.service';
import {HttpResponseToasterService} from '../../../../../../shared/core/services/http-response-toaster.service';
import {BasePlugConfigInterface} from '../../../../../../plugins/tools/interfaces/base-plug-config-interface';

@Component({
  selector: 'app-create-plugin',
  templateUrl: './create-plugin.component.html',
  styleUrls: ['./create-plugin.component.css']
})
export class CreatePluginComponent implements OnInit {
  pluginResolver: AbstractPluginResolver;
  @ViewChild(MiniAdminComponent, {static: true}) private miniAdminComponent: MiniAdminComponent;
  createForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private webDetailResolverService: WebDetailResolverService,
    private pluginFormService: PluginFormService,
    private symfonyApiClientService: SymfonyApiClientService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'create') {
      this.createPlugin();
    } else {
      this.updatePlugin();
    }
  }

  createPlugin() {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('identifier');
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(identifier);
      this.createForm = this.pluginFormService.createForm({path: 'plugin_create', querySegment: {id: this.webDetailResolverService.selectedId, identifier}});
      this.createForm.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          this.symfonyApiClientService.post<BasePlugConfigInterface>('plugin_create', this.createForm.value, {id: this.webDetailResolverService.selectedId, identifier}).subscribe({
            next: (response) => {
              this.notifierService.notify('Plugin byl úspěšně vytvořen');
              this.router.navigate(['update', response.body.id], { relativeTo: this.route.parent });
            },
            error: err => this.httpResponseToasterService.showError(err)
          });
        }
      });
    });
  }

  updatePlugin() {
    const plugin: BasePlugConfigInterface = this.route.snapshot.data.plugin;
    this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(plugin.identifier);
    this.createForm = this.pluginFormService.createForm({path: 'plugin_update', querySegment: {id: plugin.id}});
    this.createForm.patchValue(plugin);
    this.createForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.symfonyApiClientService.post('plugin_update', this.createForm.value, {id: plugin.id}).subscribe({
          next: () => {
            this.notifierService.notify('Plugin byl úspěšně upraven');
            this.router.navigate(['list-created', this.pluginResolver.identifier], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }
}
