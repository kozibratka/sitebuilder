import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuV1Component} from './components/menu-v1/menu-v1.component';
import {AdminItemComponent} from './components/admin-item/admin-item.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ItemSettingsComponent} from './components/item-settings/item-settings.component';
import {MatIconModule} from '@angular/material/icon';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {RemoveItemDialogComponent} from './components/remove-item-dialog/remove-item-dialog.component';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';



@NgModule({
  declarations: [
    MenuV1Component,
    AdminItemComponent,
    AdminComponent,
    ItemSettingsComponent,
    RemoveItemDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SortablejsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: AbstractPluginResolver, useClass: MenuV1Module, multi: true},
  ],
})
export class MenuV1Module { }
