import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractMenuPluginResolver} from '../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {TextMenuResolverService} from './text-plugin/tools/services/text-menu-resolver.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TextPluginAdminComponent} from './text-plugin/admin/text-plugin-admin/text-plugin-admin.component';
import {CoreModule} from '../shared/core/core.module';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [
     {provide: AbstractMenuPluginResolver, useClass: TextMenuResolverService, multi: true},
  ],
  declarations: [
    TextPluginAdminComponent
  ]
})
export class PluginsModule { }
