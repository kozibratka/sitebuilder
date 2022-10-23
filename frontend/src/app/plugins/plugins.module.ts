import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractPluginResolver} from '../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-plugin-resolver';
import {TextPluginResolverService} from './text-plugin/tools/services/text-plugin-resolver.service';
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
     {provide: AbstractPluginResolver, useClass: TextPluginResolverService, multi: true},
  ],
  declarations: [
    TextPluginAdminComponent
  ]
})
export class PluginsModule { }
