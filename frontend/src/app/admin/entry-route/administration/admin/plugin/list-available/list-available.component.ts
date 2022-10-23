import {Component, Inject, OnInit} from '@angular/core';
import {AbstractPluginResolver} from '../../page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';
import {ActivatedRoute} from '@angular/router';
import {BasePlugConfigInterface} from '../../../../../../plugins/tools/interfaces/base-plug-config-interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list-available.component.html',
  styleUrls: ['./list-available.component.css']
})
export class ListAvailableComponent implements OnInit {

  availableDisabledPlugins: AbstractPluginResolver[] = [];
  availableEnabledPlugins: AbstractPluginResolver[] = [];
  displayedColumns = ['name', 'description', 'action'];

  constructor(
    @Inject(AbstractPluginResolver) public abstractMenuPluginResolver: AbstractPluginResolver[],
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const globalPlugins = data.globalPlugins as BasePlugConfigInterface[];
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
