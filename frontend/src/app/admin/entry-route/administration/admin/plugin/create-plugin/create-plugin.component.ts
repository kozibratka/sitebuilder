import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {WebDetailResolverService} from '../../../tools/route-resolvers/web-detail-resolver.service';
import {MiniAdminComponent} from '../../../../../../shared/core/components/mini-admin/mini-admin.component';

@Component({
  selector: 'app-create-plugin',
  templateUrl: './create-plugin.component.html',
  styleUrls: ['./create-plugin.component.css']
})
export class CreatePluginComponent implements OnInit {
  pluginResolver: AbstractMenuPluginResolver;
  @ViewChild(MiniAdminComponent, {static: true}) private miniAdminComponent: MiniAdminComponent;

  constructor(
    private route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private webDetailResolverService: WebDetailResolverService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('identifier');
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(identifier);
      this.miniAdminComponent.settings = this.pluginResolver;
      this.miniAdminComponent.headerName = 'Vytvoření pluginu ' + this.pluginResolver.name;
      this.miniAdminComponent.showContent(this.pluginResolver.adminComponentsClass()[0].component);
    });
  }

}
