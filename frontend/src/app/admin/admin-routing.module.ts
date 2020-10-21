import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PageBuilderComponent} from './admin-component/page-builder-module/page-builder-component/page-builder.component';
import {DashboardComponent} from './admin-component/dashboard-component/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
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
