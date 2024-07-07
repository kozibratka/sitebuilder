import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpResponseToasterService} from '../../../core/services/http-response-toaster.service';
import {SymfonyApiClientService} from '../../../core/services/api/symfony-api/symfony-api-client.service';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {NotifierService} from '../../../core/services/notifier.service';
import {BasePlugConfigInterface} from '../../../plugins/shared/interfaces/base-plug-config-interface';
import {PluginResolverService} from '../../../plugins/shared/services/plugin-resolver.service';
import {AdminAbleInterface} from "../../../core/components/mini-admin/tools/interfaces/admin-able-interface";
import {SettingAbleInterface} from "../../../core/components/mini-admin/tools/interfaces/setting-able-interface";
import {MiniAdminComponent} from "../../../core/components/mini-admin/mini-admin.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-update-plugin',
  standalone: true,
  templateUrl: './update-plugin.component.html',
  imports: [
    CommonModule,
    MiniAdminComponent,
    RouterLink,
    MatAnchor,
    MatButton
  ],
  styleUrls: ['./update-plugin.component.css']
})
export class UpdatePluginComponent implements OnInit {
  pluginResolver: AbstractPluginResolver<any>;
  pluginSetting: BasePlugConfigInterface;

  adminConfig: AdminAbleInterface & SettingAbleInterface = null;

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
      this.pluginSetting = data['plugin'];
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(data['plugin'].identifier);
      this.adminConfig = {contextObject: data['plugin'], settings: this.pluginSetting, adminComponentsClass: this.pluginResolver.adminComponentsClass};
    });
  }

  submit() {
    this.symfonyApiClientService.post('plugin_update', this.pluginSetting, {id: this.pluginSetting.id}).subscribe({
      next: () => {
        this.notifierService.notify('Plugin byl úspěšně upraven');
      },
      error: err => this.httpResponseToasterService.showError(err)
    });
  }

}
