import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MenuResolverService} from './services/menu-resolver.service';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from '../../../core/core.module';
import {AbstractPluginResolver} from '../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MenuAdminItemComponent} from './components/menu-admin-item/menu-admin-item.component';
import {MenuAdminComponent} from './pages/menu-admin/menu-admin.component';
import {MenuComponent} from './components/menu/menu.component';
import {MenuItemSettingsComponent} from './components/menu-item-settings/menu-item-settings.component';
import {MenuRemoveItemDialogComponent} from './components/menu-remove-item-dialog/menu-remove-item-dialog.component';
import {MenuLogoAdminComponent} from './pages/menu-logo-admin/menu-logo-admin.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuAdminItemComponent,
    MenuAdminComponent,
    MenuItemSettingsComponent,
    MenuRemoveItemDialogComponent,
    MenuLogoAdminComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        SortablejsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatButtonModule,
        CoreModule
    ],
  providers: [
    {provide: AbstractPluginResolver, useClass: MenuResolverService, multi: true},
  ],
})
export class MenuModule { }
