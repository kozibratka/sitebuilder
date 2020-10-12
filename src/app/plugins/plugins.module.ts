import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractMenuPluginResolverMessenger} from '../admin/page-builder/page-builder/menu-builder/menu-plugin-resolvers/messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';
import {TestMenuResloverMessengerService} from './plugins/test/services/test-menu-reslover-messenger.service';



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
