import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../../base-admin/admin/admin.component';
import {MenuLabel} from '../../base-admin/admin/tools/interfaces/menu-label';
import {BaseAdminModule} from '../../base-admin/base-admin.module';
import {TextSettingsComponent} from './text-settings/text-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: 'text-settings', component: TextSettingsComponent}
    ]
  }
];

const menu: MenuLabel[] = [
  {
    label: 'nastavení textu',
    path: 'text-settings'
  }
];

@NgModule({
  declarations: [TextSettingsComponent],
  imports: [
    CommonModule,
    BaseAdminModule.menu(menu, 'Nastavení textu'),
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
