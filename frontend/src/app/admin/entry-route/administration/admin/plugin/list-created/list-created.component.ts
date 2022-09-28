import {Component, Inject, OnInit} from '@angular/core';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {ActivatedRoute} from '@angular/router';
import {BasePlugSettingsinInterface} from '../../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list-created.component.html',
  styleUrls: ['./list-created.component.css']
})
export class ListCreatedComponent implements OnInit {
  createdPlugins: BasePlugSettingsinInterface[] = [];
  displayedColumns = ['name'];
  pluginResolver: AbstractMenuPluginResolver;

  constructor(
    private route: ActivatedRoute,
    @Inject(AbstractMenuPluginResolver) private abstractMenuPluginResolvers: AbstractMenuPluginResolver[],
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const identifier = params.get('identifier');
      this.pluginResolver = this.abstractMenuPluginResolvers.filter(value => value.identifier === identifier)[0];
    });
    this.route.data.subscribe((data) => {
      this.createdPlugins = data.plugins;
    });
  }

}
