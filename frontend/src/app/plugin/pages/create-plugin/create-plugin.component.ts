import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {WebDetailResolverService} from '../../../web/services/web-detail-resolver.service';
import {PluginFormService} from '../../services/plugin-form.service';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MiniAdminComponent} from '../../../core/components/mini-admin/mini-admin.component';
import {NotifierService} from '../../../core/services/notifier.service';
import {PluginResolverService} from '../../../plugins/services/plugin-resolver.service';
import {BasePlugConfigInterface} from '../../../plugins/interfaces/base-plug-config-interface';
import {ApiFormService} from "../../../core/services/form/api-form.service";

@Component({
  selector: 'app-create-plugin',
  templateUrl: './create-plugin.component.html',
  styleUrls: ['./create-plugin.component.css']
})
export class CreatePluginComponent implements OnInit {
  pluginResolver: AbstractPluginResolver<any>;
  @ViewChild(MiniAdminComponent, {static: true}) private miniAdminComponent: MiniAdminComponent;
  createForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private webDetailResolverService: WebDetailResolverService,
    private pluginFormService: PluginFormService,
    private router: Router,
    private httpResponseToasterService: HttpResponseToasterService,
    private notifierService: NotifierService,
    private apiFormService: ApiFormService,
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
      this.createForm = this.pluginFormService.createForm();
      this.createForm.statusChanges.subscribe(status => {
        if (status === 'VALID') {
          this.apiFormService.send('plugin_create', this.createForm, {id: this.webDetailResolverService.selectedId, identifier}).subscribe({
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
    this.createForm = this.pluginFormService.createForm();
    this.createForm.patchValue(plugin);
    this.createForm.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.apiFormService.send('plugin_update', this.createForm, {id: plugin.id}).subscribe({
          next: (response) => {
            this.notifierService.notify('Plugin byl úspěšně upraven');
            this.router.navigate(['list-created', this.pluginResolver.identifier], { relativeTo: this.route.parent });
          },
          error: err => this.httpResponseToasterService.showError(err)
        });
      }
    });
  }
}
