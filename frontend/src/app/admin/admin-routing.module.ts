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

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [RouteRoleGuardService],
    canActivateChild: [RouteRoleGuardService],
    children: [
      {
        path: 'page-builder/create',
        component: PageBuilderComponent,
        children: [
          {
            path: 'item-admin',
            loadChildren: () => import('../plugins/modules/routes-admin.module').then(m => m.RoutesAdminModule)
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
    RouterModule.forRoot(routes)
  ]
})
export class AdminRoutingModule { }
