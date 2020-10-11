import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseAdminModule} from '../../../base-admin/base-admin.module';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../../../base-admin/admin/admin.component';
import {MenuLabel} from '../../../base-admin/menu-labels/interfaces/menu-label';

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
