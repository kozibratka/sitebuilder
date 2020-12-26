import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PageBuilderComponent} from './entry-route/administration-component/admin-component/page-builder-module/page-builder-component/page-builder.component';
import {DashboardComponent} from './entry-route/administration-component/admin-component/dashboard-component/dashboard.component';
import {AdministrationComponent} from './entry-route/administration-component/administration.component';
import {AuthorizationComponent} from './entry-route/authorization-component/authorization.component';
import {RegistrationComponent} from './entry-route/authorization-component/registration/registration.component';
import {LoginComponent} from './entry-route/authorization-component/login-component/login.component';
import {RouteRoleGuardService} from '../core/services/route-role-guard.service';
import {WebListComponent} from './entry-route/administration-component/admin-component/web-component/web-list/web-list.component';
import {WebListResolverService} from './entry-route/administration-component/admin-component/web-component/web-list/tools/route-resolvers/web-list-resolver.service';
import {WebCreateComponent} from './entry-route/administration-component/admin-component/web-component/web-create/web-create.component';
import {WebDetailResolverService} from './entry-route/administration-component/admin-component/web-component/web-create/tools/route-resolvers/web-detail-resolver.service';
import {PageListComponent} from './entry-route/administration-component/admin-component/page-component/page-list/page-list.component';
import {PageListResolverService} from './entry-route/administration-component/admin-component/page-component/page-list/tools/route-resolvers/page-list-resolver.service';
import {PageCreateComponent} from './entry-route/administration-component/admin-component/page-component/page-create/page-create.component';
import {PageDetailResolverService} from './entry-route/administration-component/admin-component/page-component/page-create/tools/route-resolvers/page-detail-resolver.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [RouteRoleGuardService],
    children: [
      {
        path: 'web',
        children: [
          {
            path: 'list',
            component: WebListComponent,
            resolve: {webList: WebListResolverService},
            runGuardsAndResolvers: 'always',
          },
          {
            path: 'create',
            component: WebCreateComponent
          },
          {
            path: 'update/:id',
            component: WebCreateComponent,
            resolve: {webDetail: WebDetailResolverService},
          }
        ]
      },
      {
        path: 'page/:webId',
        children: [
          {
            path: 'list',
            component: PageListComponent,
            resolve: {pageList: PageListResolverService},
            runGuardsAndResolvers: 'always',
          },
          {
            path: 'update/:id',
            component: PageCreateComponent,
            resolve: {pageDetail: PageDetailResolverService},
          },
          {
            path: 'create',
            component: PageCreateComponent
          },
          {
            path: 'page-builder/:id',
            component: PageListComponent
          }
        ]
      },
      {
        path: 'page-builder/create',
        component: PageBuilderComponent,
        children: [
          {
            path: 'item-admin',
            loadChildren: () => import('../plugins/routes-admin.module').then(m => m.RoutesAdminModule)
          }
        ]
      },
      {
        path: '',
        component: DashboardComponent
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
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ]
})
export class AdminRoutingModule { }
