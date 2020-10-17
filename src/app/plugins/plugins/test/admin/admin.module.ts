import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseAdminModule} from '../../../base-admin-layout/base-admin.module';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../../../base-admin-layout/admin/admin.component';
import {MenuLabel} from '../../../base-admin-layout/menu-labels/interfaces/menu-label';
import { BasePluginAdminComponent } from './base-plugin-admin/base-plugin-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'color-settings', component: ColorSettingsComponent}
    ]
  }
];

const menu: MenuLabel[] = [
  {
    label: 'nastavení barvy',
    path: 'color-settings'
  }
];

@NgModule({
  declarations: [ColorSettingsComponent],
  imports: [
    CommonModule,
    BaseAdminModule.menu(menu),
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
