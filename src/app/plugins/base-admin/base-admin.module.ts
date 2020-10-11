import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {RouterModule} from '@angular/router';
import {MenuLabel} from './menu-labels/interfaces/menu-label';
import {MENU_LABELS} from './menu-labels/injection-tokens/menu-label';



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
