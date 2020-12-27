import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {RouteRoleGuardService} from '../core/services/route-role-guard.service';
import {AdministrationComponent} from './entry-route/administration/administration.component';
import {WebListComponent} from './entry-route/administration/admin/web/web-list/web-list.component';
import {WebListResolverService} from './entry-route/administration/admin/web/web-list/tools/route-resolvers/web-list-resolver.service';
import {WebCreateComponent} from './entry-route/administration/admin/web/web-create/web-create.component';
import {WebDetailResolverService} from './entry-route/administration/admin/web/web-create/tools/route-resolvers/web-detail-resolver.service';
import {PageListComponent} from './entry-route/administration/admin/page/page-list/page-list.component';
import {PageListResolverService} from './entry-route/administration/admin/page/page-list/tools/route-resolvers/page-list-resolver.service';
import {PageCreateComponent} from './entry-route/administration/admin/page/page-create/page-create.component';
import {PageDetailResolverService} from './entry-route/administration/admin/page/page-create/tools/route-resolvers/page-detail-resolver.service';
import {PageBuilderComponent} from './entry-route/administration/admin/page-builder-module/page-builder/page-builder.component';
import {DashboardComponent} from './entry-route/administration/admin/dashboard/dashboard.component';
import {AuthorizationComponent} from './entry-route/authorization/authorization.component';
import {RegistrationComponent} from './entry-route/authorization/registration/registration.component';
import {LoginComponent} from './entry-route/authorization/login/login.component';


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
            component: PageBuilderComponent,
            children: [
              {
                path: 'item-admin',
                loadChildren: () => import('../plugins/routes-admin.module').then(m => m.RoutesAdminModule)
              }
            ]
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
