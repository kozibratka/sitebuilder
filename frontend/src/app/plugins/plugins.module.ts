import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AbstractMenuPluginResolverMessenger} from '../admin/components/admin/modules/page-builder/components/page-builder/tools/messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';
import {TestMenuResloverMessengerService} from './components/test/tools/services/test-menu-reslover-messenger.service';



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
