import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {RouteRoleGuardService} from '../core/services/route-role-guard.service';
import {AdministrationComponent} from './entry-route/administration/administration.component';
import {WebListComponent} from './entry-route/administration/admin/site-builder/web/web-list/web-list.component';
import {WebListResolverService} from './entry-route/administration/admin/site-builder/web/web-list/tools/route-resolvers/web-list-resolver.service';
import {WebCreateComponent} from './entry-route/administration/admin/site-builder/web/web-create/web-create.component';
import {WebDetailResolverService} from './entry-route/administration/admin/site-builder/web/web-create/tools/route-resolvers/web-detail-resolver.service';
import {PageListComponent} from './entry-route/administration/admin/site-builder/page/page-list/page-list.component';
import {PageListResolverService} from './entry-route/administration/admin/site-builder/page/page-list/tools/route-resolvers/page-list-resolver.service';
import {PageCreateComponent} from './entry-route/administration/admin/site-builder/page/page-create/page-create.component';
import {PageDetailResolverService} from './entry-route/administration/admin/site-builder/page/page-create/tools/route-resolvers/page-detail-resolver.service';
import {PageBuilderComponent} from './entry-route/administration/admin/site-builder/page-builder/page-builder.component';
import {DashboardComponent} from './entry-route/administration/admin/dashboard/dashboard.component';
import {AuthorizationComponent} from './entry-route/authorization/authorization.component';
import {RegistrationComponent} from './entry-route/authorization/registration/registration.component';
import {LoginComponent} from './entry-route/authorization/login/login.component';
import {PageBuilderResolverService} from './entry-route/administration/admin/site-builder/page-builder/tools/route-resolvers/page-builder-resolver.service';


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
            path: 'update/:webId',
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
            resolve: {pageDetail: PageBuilderResolverService},
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
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })
  ]
})
export class AdminRoutingModule { }
