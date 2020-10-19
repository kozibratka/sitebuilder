import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseAdminModule} from '../../../../modules/base-admin-layout/base-admin.module';
import { ColorSettingsComponent } from './components/color-settings/color-settings.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../../../../modules/base-admin-layout/components/admin/admin.component';
import {MenuLabel} from '../../../../modules/base-admin-layout/components/admin/tools/interfaces/menu-label';

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
