import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {WebDetailResolverService} from './web/services/web-detail-resolver.service';
import {WebListResolverGuard} from './web/services/web-list-resolver.service';
import {RouteRoleGuardService} from './core/guards/route-role-guard.service';
import {LayoutComponent} from './layout/components/layout/layout.component';


const routes: Routes = [
  {
    path: 'admin/:webId',
    component: LayoutComponent,
    canActivate: [RouteRoleGuardService, WebListResolverGuard],
    resolve: {webList: WebListResolverGuard, webDetail: WebDetailResolverService},
    children: [
      {
        path: 'web',
        loadChildren: () => import('./web/web.module').then(m => m.WebModule)
      },
      {
        path: 'page',
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
      },
      {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.FileModule)

      },
      {
        path: 'plugin',
        loadChildren: () => import('./plugin/plugin.module').then(m => m.PluginModule)
      },
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/authorization/login',
    pathMatch: 'full'
  },
  {
    path: 'authorization',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })
  ]
})
export class AppAdminRoutingModule { }