import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'test-plugin', loadChildren: () => import('./test-plugin/admin/admin.module').then(m => m.AdminModule) },
  { path: 'text-plugin', loadChildren: () => import('./text-plugin/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RoutesAdminModule { }
