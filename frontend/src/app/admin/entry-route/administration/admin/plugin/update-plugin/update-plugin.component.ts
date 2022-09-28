import {Component, ComponentFactory, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PluginResolverService} from '../../../../../../plugins/tools/services/plugin-resolver.service';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {AbstractAdminSetting} from '../../../../../../plugins/tools/abstract-class/abstract-admin-setting';

@Component({
  selector: 'app-update-plugin',
  templateUrl: './update-plugin.component.html',
  styleUrls: ['./update-plugin.component.css']
})
export class UpdatePluginComponent implements OnInit {
  pluginResolver: AbstractMenuPluginResolver;
  @ViewChild(TemplateRef, {static: true, read: ViewContainerRef}) private destination: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private pluginResolverService: PluginResolverService,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pluginResolver = this.pluginResolverService.getPluginResolverByIdentifier(data.plugin.identifier);
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.pluginResolver.adminComponentClass);
      const instance = this.destination.createComponent<AbstractAdminSetting<any>>(factory).instance;
      instance.settings = data.plugin;
    });
  }

}
