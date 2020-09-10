import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageBuilderComponent} from './page-builder/page-builder/page-builder.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'page-builder/create',
        component: PageBuilderComponent
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
