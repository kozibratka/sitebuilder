import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {MenuLabel} from './admin/tools/interfaces/menu-label';
import {MENU_LABELS} from './admin/tools/injection-tokens/menu-label';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminComponent]
})
export class BaseAdminModule {

  static menu(menuLabels: MenuLabel[], modalTitle: string): ModuleWithProviders<BaseAdminModule> {
    return {
      ngModule: BaseAdminModule,
      providers: [
        {provide: MENU_LABELS, useValue: menuLabels },
        {provide: 'modalTitle', useValue: modalTitle }
      ]
    };
  }

}
