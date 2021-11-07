import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractMenuPluginResolver} from '../admin/entry-route/administration/admin/page/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {TextMenuResolverService} from './text-plugin/tools/services/text-menu-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
     {provide: AbstractMenuPluginResolver, useClass: TextMenuResolverService, multi: true},
  ],
  declarations: []
})
export class PluginsModule { }
