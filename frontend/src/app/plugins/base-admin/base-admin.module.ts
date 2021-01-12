import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {PluginAdminComponent} from './admin/plugin-admin.component';
import {MenuLabel} from './admin/tools/interfaces/menu-label';
import {MENU_LABELS} from './admin/tools/injection-tokens/menu-label';



@NgModule({
  declarations: [PluginAdminComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [PluginAdminComponent]
})
export class BaseAdminModule {

  static menu(menuLabels: MenuLabel[], modalTitle: string, defaultSelectedMenu: string): ModuleWithProviders<BaseAdminModule> {
    return {
      ngModule: BaseAdminModule,
      providers: [
        {provide: MENU_LABELS, useValue: menuLabels },
        {provide: 'modalTitle', useValue: modalTitle },
        {provide: 'defaultSelectedMenu', useValue: defaultSelectedMenu }
      ]
    };
  }

}
