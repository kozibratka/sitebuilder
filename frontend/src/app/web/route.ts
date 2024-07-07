import {WebListComponent} from "./pages/web-list/web-list.component";
import {WebListResolverGuard} from "./services/web-list-resolver.service";
import {SelectTemplateComponent} from "./pages/web-create/select-template/select-template.component";
import {GenericResolver} from "../core/services/resolver/generic.resolver";
import {CreateNameComponent} from "./pages/web-create/create-name/create-name.component";
import {WebCreateComponent} from "./pages/web-create/web-create.component";

export default [
  {
    path: 'list',
    component: WebListComponent,
    resolve: {webList: WebListResolverGuard},
  },
  {
    path: 'select-template',
    component: SelectTemplateComponent,
    resolve: {templates: GenericResolver},
    data: {resolverConfig: {data: {route: 'web_template_list'}}},
  },
  {
    path: 'create-name/:idTemplate',
    component: CreateNameComponent
  },
  {
    path: 'update/:webId',
    component: WebCreateComponent,
    resolve: {web: GenericResolver},
    data: {resolverConfig: {data: {route: 'web_read'}, queryDataMap: {webId: 'id'}}},
  }
];
