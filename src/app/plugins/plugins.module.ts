import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import {AbstractMenuPluginResolverMessenger} from '../admin/page-builder/page-builder/menu-builder/services/menu-plugin-resolvers/abstract-class/abstract-menu-plugin-resolver-messenger';
import {TestMenuResloverMessengerService} from './test/services/test-menu-reslover-messenger.service';



@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule
  ],
  providers: [
     {provide: AbstractMenuPluginResolverMessenger, useClass: TestMenuResloverMessengerService, multi: true}
  ]
})
export class PluginsModule { }
