import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'page-builder',
        loadChildren: () => import('./page-builder/page-builder.module').then(m => m.PageBuilderModule)
      },
      {
        path: '',
        component: DashboardComponent
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
