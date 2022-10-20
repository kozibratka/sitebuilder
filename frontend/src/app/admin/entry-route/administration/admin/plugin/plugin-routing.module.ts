import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginComponent } from './plugin.component';
import {GlobalPluginsResolver} from '../tools/route-resolvers/global-plugins.resolver';
import {ListAvailableComponent} from './list-available/list-available.component';
import {GenericResolver} from '../../../../../shared/core/services/resolver/generic.resolver';
import {ListCreatedComponent} from './list-created/list-created.component';
import {CreatePluginComponent} from './create-plugin/create-plugin.component';
import {UpdatePluginComponent} from './update-plugin/update-plugin.component';

const routes: Routes = [
  {path: '', component: PluginComponent},
  {path: 'list-available', component: ListAvailableComponent, resolve: {globalPlugins: GlobalPluginsResolver}},
  {
    path: 'list-created/:identifier',
    component: ListCreatedComponent,
    resolve: {plugins: GenericResolver},
    data: {resolverConfig: {data: {route: 'plugin_list_by_identifier'}, queryDataMap: {webId: 'id', identifier: 'identifier'}}},
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create/:identifier',
    component: CreatePluginComponent,
  },
  {
    path: 'setting/:plugin',
    component: CreatePluginComponent,
    resolve: {plugin: GenericResolver},
    data: {resolverConfig: {data: {route: 'plugin_update'}, queryDataMap: {plugin: 'id'}}}
  },
  {
    path: 'update/:plugin',
    component: UpdatePluginComponent,
    resolve: {plugin: GenericResolver},
    data: {resolverConfig: {data: {route: 'plugin_update'}, queryDataMap: {plugin: 'id'}}}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginRoutingModule { }
