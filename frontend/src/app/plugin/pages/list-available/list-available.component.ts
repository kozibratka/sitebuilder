import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {BasePlugConfigInterface} from '../../../plugins/tools/interfaces/base-plug-config-interface';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';

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
