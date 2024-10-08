import {PageListComponent} from "./pages/page-list/page-list.component";
import {GenericResolver} from "../core/services/resolver/generic.resolver";
import {PageCreateComponent} from "./pages/page-create/page-create.component";
import {PageDetailResolverService} from "./services/resolvers/page-detail-resolver.service";
import {PageBuilderComponent} from "./pages/page-builder/page-builder.component";
import {PageBuilderResolverService} from "./services/resolvers/page-builder-resolver.service";
import {PageListResolverService} from "./services/resolvers/page-list-resolver.service";
import {GlobalPluginsResolver} from "../plugin/services/global-plugins.resolver";

export default   [
  {
    path: 'list',
    component: PageListComponent,
    resolve: {pageList: PageListResolverService},
    // runGuardsAndResolvers: 'always',
  },
  {
    path: 'update/:pageId',
    component: PageCreateComponent,
    resolve: {pageDetail: PageDetailResolverService},
  },
  {
    path: 'create',
    component: PageCreateComponent
  },
  {
    path: 'page-builder/:pageId',
    component: PageBuilderComponent,
    resolve: {pageDetail: PageBuilderResolverService, globalPlugins: GlobalPluginsResolver},
  }
];
