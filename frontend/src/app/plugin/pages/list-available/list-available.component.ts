import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import * as _ from 'lodash';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {BasePlugConfigInterface} from '../../../plugins/shared/interfaces/base-plug-config-interface';
import {CommonModule} from "@angular/common";
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list-available.component.html',
  styleUrls: ['./list-available.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatAnchor,
    MatButton,
    RouterLink,
    MatIcon,
  ],
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
      const globalPlugins = data['globalPlugins'] as BasePlugConfigInterface[];
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
