import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../components/admin/components/dashboard/dashboard.component';
import {PageBuilderComponent} from '../components/admin/modules/page-builder/components/page-builder/page-builder.component';

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
            loadChildren: () => import('../../plugins/modules/routes-admin.module').then(m => m.RoutesAdminModule)
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
