import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestMenuResloverService} from './test-plugin/tools/services/test-menu-reslover.service';
import {AbstractMenuPluginResolver} from '../admin/entry-route/administration/admin/site-builder/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {TextMenuResolverService} from './text-plugin/tools/services/text-menu-resolver.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
     {provide: AbstractMenuPluginResolver, useClass: TestMenuResloverService, multi: true},
     {provide: AbstractMenuPluginResolver, useClass: TextMenuResolverService, multi: true},
  ],
  declarations: []
})
export class PluginsModule { }
