import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractMenuPluginResolverMessenger} from '../admin/entry-route/administration-component/admin-component/page-builder-module/page-builder-component/tools/messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';
import {TestMenuResloverMessengerService} from './test-plugin/tools/services/test-menu-reslover-messenger.service';



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
