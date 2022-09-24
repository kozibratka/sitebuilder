import {Component, Inject, OnInit} from '@angular/core';
import {AbstractMenuPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {ActivatedRoute} from '@angular/router';
import {BasePlugSettingsinInterface} from '../../../../../../plugins/tools/interfaces/base-plug-settingsin-interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list-available.component.html',
  styleUrls: ['./list-available.component.css']
})
export class ListAvailableComponent implements OnInit {

  availableDisabledPlugins: AbstractMenuPluginResolver[] = [];
  availableEnabledPlugins: AbstractMenuPluginResolver[] = [];
  displayedColumns = ['name', 'description', 'action'];

  constructor(
    @Inject(AbstractMenuPluginResolver) public abstractMenuPluginResolver: AbstractMenuPluginResolver[],
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const globalPlugins = data.globalPlugins as BasePlugSettingsinInterface[];
      this.abstractMenuPluginResolver.forEach(param => {
        if (_.find(globalPlugins, {identifier: param.identifier})) {
          this.availableEnabledPlugins.push(param);
        } else {
          this.availableDisabledPlugins.push(param);
        }
      });
    });
  }

}
