import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextPluginResolverService} from './text-plugin/tools/services/text-plugin-resolver.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TextPluginAdminComponent} from './text-plugin/admin/text-plugin-admin/text-plugin-admin.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {AbstractPluginResolver} from '../page/services/abstract-classes/abstract-plugin-resolver';

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
