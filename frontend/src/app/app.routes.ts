import { Routes } from '@angular/router';
import {LayoutComponent} from "./layout/components/layout/layout.component";
import {WebListResolverGuard} from "./web/services/web-list-resolver.service";
import {WebDetailResolverService} from "./web/services/web-detail-resolver.service";
import {UserResolver} from "./authorization/resolvers/user.resolver";
import {CompAComponent} from "./Test/comp-a/comp-a.component";
import {PublicComponent} from "./public/pages/public/public.component";
import {PageResolver} from "./public/services/page.resolver";
import {Layout2Component} from "./layout/components/layout2/layout2.component";

export const routes: Routes = [
  {
    path: 'admin/:webId',
    component: Layout2Component,
    canActivate: [WebListResolverGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        resolve: {webDetail: WebDetailResolverService, user: UserResolver},
        children: [
          {
            path: 'web',
            loadChildren: () => import('./web/route')
          },
          {
            path: 'page',
            loadChildren: () => import('./page/route')
          },
          {
            path: 'file',
            loadChildren: () => import('./file/route')

          },
          {
            path: 'plugin',
            loadChildren: () => import('./plugin/route'),
          },
          {
            path: '',
            loadChildren: () => import('./dashboard/route'),
          }
        ]

      }
    ]
  },
  {
    path: 'authorization',
    loadChildren: () => import('./authorization/route')
  },
  {
    path: '',
    redirectTo: '/admin/0',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: CompAComponent
  }
];

export const publicRoutes: Routes = [
  {
    path: '**',
    component: PublicComponent,
    resolve: {pageDetail: PageResolver},
  }
]
