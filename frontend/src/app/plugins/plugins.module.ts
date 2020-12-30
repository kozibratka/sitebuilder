import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestMenuResloverMessengerService} from './test-plugin/tools/services/test-menu-reslover-messenger.service';
import {AbstractMenuPluginResolverMessenger} from '../admin/entry-route/administration/admin/site-builder/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
     {provide: AbstractMenuPluginResolverMessenger, useClass: TestMenuResloverMessengerService, multi: true},
  ],
  declarations: []
})
export class PluginsModule { }
