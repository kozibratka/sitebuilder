import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin-component/admin.component';
import {MenuLabel} from './admin-component/tools/interfaces/menu-label';
import {MENU_LABELS} from './admin-component/tools/injection-tokens/menu-label';



@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminComponent]
})
export class BaseAdminModule {

  static menu(menuLabels: MenuLabel[]): ModuleWithProviders<BaseAdminModule> {
    return {
      ngModule: BaseAdminModule,
      providers: [
        {provide: MENU_LABELS, useValue: menuLabels }
      ]
    };
  }

}
