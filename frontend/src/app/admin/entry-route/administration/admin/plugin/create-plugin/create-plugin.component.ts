import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {ActivatedRoute} from '@angular/router';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {AbstractAdminSetting} from '../../../../../../plugins/tools/abstract-class/abstract-admin-setting';
import {WebDetailResolverService} from '../../../tools/route-resolvers/web-detail-resolver.service';

@Component({
  selector: 'app-create-plugin',
  templateUrl: './create-plugin.component.html',
  styleUrls: ['./create-plugin.component.css']
})
export class CreatePluginComponent implements OnInit {
  pluginResolver: AbstractMenuPluginResolver;
  @ViewChild(TemplateRef, {static: true, read: ViewContainerRef}) private destination: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private resolver: ComponentFactoryResolver,
    private webDetailResolverService: WebDetailResolverService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('identifier');
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(identifier);
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.pluginResolver.adminComponentClass);
      const adminComponent = this.destination.createComponent<AbstractAdminSetting<any>>(factory);
      adminComponent.instance.menuResolver = this.pluginResolver;
      adminComponent.instance.webId = this.webDetailResolverService.selectedId;
    });
  }

}
