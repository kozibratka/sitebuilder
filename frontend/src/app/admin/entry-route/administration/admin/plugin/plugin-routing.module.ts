import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginComponent } from './plugin.component';
import {GlobalPluginsResolver} from '../tools/route-resolvers/global-plugins.resolver';
import {ListAvailableComponent} from './list-available/list-available.component';
import {ListComponent} from './list/list.component';
import {GenericResolver} from '../../../../../shared/core/services/resolver/generic.resolver';

const routes: Routes = [
  {path: '', component: PluginComponent},
  {path: 'list-available', component: ListAvailableComponent, resolve: {globalPlugins: GlobalPluginsResolver}},
  {
    path: 'list-created/:identifier',
    component: ListComponent,
    resolve: {plugins: GenericResolver},
    data: {resolverConfig: {data: {route: 'plugin_list_by_identifier'}, queryDataMap: {webId: 'id', identifier: 'identifier'}}}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule { }
