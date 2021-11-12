import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {RouteRoleGuardService} from '../core/guards/route-role-guard.service';
import {AdministrationComponent} from './entry-route/administration/administration.component';
import {WebListComponent} from './entry-route/administration/admin/web/web-list/web-list.component';
import {WebCreateComponent} from './entry-route/administration/admin/web/web-create/web-create.component';
import {WebDetailResolverService} from './entry-route/administration/tools/route-resolvers/web-detail-resolver.service';
import {PageListComponent} from './entry-route/administration/admin/page/page-list/page-list.component';
import {PageListResolverService} from './entry-route/administration/admin/page/page-list/tools/route-resolvers/page-list-resolver.service';
import {PageCreateComponent} from './entry-route/administration/admin/page/page-create/page-create.component';
import {PageDetailResolverService} from './entry-route/administration/admin/page/page-create/tools/route-resolvers/page-detail-resolver.service';
import {PageBuilderComponent} from './entry-route/administration/admin/page/page-builder/page-builder.component';
import {DashboardComponent} from './entry-route/administration/admin/dashboard/dashboard.component';
import {AuthorizationComponent} from './entry-route/authorization/authorization.component';
import {RegistrationComponent} from './entry-route/authorization/registration/registration.component';
import {LoginComponent} from './entry-route/authorization/login/login.component';
import {PageBuilderResolverService} from './entry-route/administration/admin/page/page-builder/tools/route-resolvers/page-builder-resolver.service';
import {GlobalPluginsResolver} from './entry-route/administration/admin/tools/route-resolvers/global-plugins.resolver';
import {WebListGuard} from './entry-route/administration/tools/guards/web-list.guard';


const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [RouteRoleGuardService, WebListGuard],
    resolve: {webList: WebListGuard, webDetail: WebDetailResolverService},
    children: [
      {
        path: 'web',
        children: [
          {
            path: 'list',
            component: WebListComponent,
          },
          {
            path: 'create',
            component: WebCreateComponent
          },
          {
            path: 'update/:webId',
            component: WebCreateComponent,
          }
        ]
      },
      {
        path: 'page',
        children: [
          {
            path: 'list',
            component: PageListComponent,
            resolve: {pageList: PageListResolverService},
            runGuardsAndResolvers: 'always',
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
            resolve: {pageDetail: PageBuilderResolverService/*, globalPlugins: GlobalPluginsResolver*/}
          }
        ]
      },
      {
        path: '',
        component: DashboardComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'authorization',
    component: AuthorizationComponent,
    children: [
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })
  ]
})
export class AdminRoutingModule { }
