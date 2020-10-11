import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import {RouterModule} from '@angular/router';
import {MenuLabel} from './interfaces/menu-label';


export const MENU_LABELS = new InjectionToken<MenuLabel[]>('menu labels');

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
