import {GenericResolver} from "../core/services/resolver/generic.resolver";
import {ListAvailableComponent} from "./pages/list-available/list-available.component";
import {ListCreatedComponent} from "./pages/list-created/list-created.component";
import {CreatePluginComponent} from "./pages/create-plugin/create-plugin.component";
import {UpdatePluginComponent} from "./pages/update-plugin/update-plugin.component";
import {GlobalPluginsResolver} from "./services/global-plugins.resolver";

export default   [
  {path: 'list-available', component: ListAvailableComponent, resolve: {globalPlugins: GlobalPluginsResolver}},
  {
    path: 'list-created/:identifier',
    component: ListCreatedComponent,
    resolve: {plugins: GenericResolver},
    data: {resolverConfig: {data: {route: 'plugin_list_by_identifier'}, queryDataMap: {webId: 'id', identifier: 'identifier'}}},
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
