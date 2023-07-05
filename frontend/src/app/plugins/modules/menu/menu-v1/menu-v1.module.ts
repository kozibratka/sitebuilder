import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuV1Component} from './components/menu-v1/menu-v1.component';
import {MatIconModule} from '@angular/material/icon';
import {SortablejsModule} from 'ngx-sortablejs';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {AbstractPluginResolver} from '../../../../page/services/abstract-classes/abstract-plugin-resolver';
import {MenuV1ResolverService} from './services/menu-v1-resolver.service';
import {MenuV1AdminComponent} from './pages/menu-v1-admin/menu-v1-admin.component';
import {MenuV1AdminItemComponent} from './components/menu-v1-admin-item/menu-v1-admin-item.component';
import {MenuV1ItemSettingsComponent} from './components/menu-v1-item-settings/menu-v1-item-settings.component';
import {MenuV1RemoveItemDialogComponent} from './components/menu-v1-remove-item-dialog/menu-v1-remove-item-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from '../../../../core/core.module';



@NgModule({
  declarations: [
    MenuV1Component,
    MenuV1AdminItemComponent,
    MenuV1AdminComponent,
    MenuV1ItemSettingsComponent,
    MenuV1RemoveItemDialogComponent
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
    {provide: AbstractPluginResolver, useClass: MenuV1ResolverService, multi: true},
  ],
})
export class MenuV1Module { }
