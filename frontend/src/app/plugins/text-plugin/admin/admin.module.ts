import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PluginAdminComponent} from '../../base-admin/admin/plugin-admin.component';
import {MenuLabel} from '../../base-admin/admin/tools/interfaces/menu-label';
import {BaseAdminModule} from '../../base-admin/base-admin.module';
import {TextPluginAdminComponent} from './text-plugin-admin/text-plugin-admin.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: PluginAdminComponent,
    children: [
      {path: 'text-plugin-admin', component: TextPluginAdminComponent}
    ]
  }
];

const menu: MenuLabel[] = [
  {
    label: 'nastavení textu',
    identifier: 'text-settings'
  }
];

@NgModule({
  declarations: [TextPluginAdminComponent],
  imports: [
    CommonModule,
    BaseAdminModule.menu(menu, 'Nastavení textu', 'text-settings'),
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CoreModule
  ]
})
export class AdminModule { }
