import {Directive, HostListener, Inject} from '@angular/core';
import {MenuPluginResolverMessengerService} from '../services/menu-plugin-resolver-messenger.service';
import {AbstractMenuPluginResolver} from '../services/menu-plugin-resolvers/abstract-menu-plugin-resolver';

@Directive({
  selector: '[appMenuPluginResolver]'
})
export class MenuPluginResolverDirective {

  @Inject(MenuPluginResolverMessengerService) menuPluginResolverMessengerService: MenuPluginResolverMessengerService;

  constructor(private abstractMenuPluginResolver: AbstractMenuPluginResolver) {

  }

  @HostListener('dragstart')
  resolveComponent(): void{
    this.menuPluginResolverMessengerService.setComponentToCreate(this.abstractMenuPluginResolver.getComponent());
  }
}
