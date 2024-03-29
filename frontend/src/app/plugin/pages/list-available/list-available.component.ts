import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {BasePlugConfigInterface} from '../../../plugins/interfaces/base-plug-config-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list-available.component.html',
  styleUrls: ['./list-available.component.css']
})
export class ListAvailableComponent implements OnInit {

  allPlugins: AbstractPluginResolver<any>[] = [];
  usedPlugins = new Set<string>();
  displayedColumns = ['name', 'description', 'action'];

  constructor(
    @Inject(AbstractPluginResolver) public abstractMenuPluginResolver: AbstractPluginResolver<any>[],
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const globalPlugins = data.globalPlugins as BasePlugConfigInterface[];
      this.abstractMenuPluginResolver.forEach(param => {
        this.allPlugins.push(param);
        if (_.find(globalPlugins, {identifier: param.identifier})) {
          this.usedPlugins.add(param.identifier);
        }
      });
    });
  }

  isPluginUsed(identifier): boolean {
    return this.usedPlugins.has(identifier);
  }

}
