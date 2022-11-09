import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginComponent } from './plugin.component';
import {GenericResolver} from '../core/services/resolver/generic.resolver';
import {GlobalPluginsResolver} from '../administration/admin/tools/route-resolvers/global-plugins.resolver';
import {ListCreatedComponent} from './pages/list-created/list-created.component';
import {ListAvailableComponent} from './pages/list-available/list-available.component';
import {CreatePluginComponent} from './pages/create-plugin/create-plugin.component';
import {UpdatePluginComponent} from './pages/update-plugin/update-plugin.component';

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
