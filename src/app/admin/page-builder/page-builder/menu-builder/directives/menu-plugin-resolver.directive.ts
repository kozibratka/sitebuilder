import {Directive, HostListener, Inject, Input} from '@angular/core';
import {MenuPluginResolverMessengerService} from '../services/menu-plugin-resolver-messenger.service';
import {AbstractMenuPluginResolver} from '../services/menu-plugin-resolvers/abstract-menu-plugin-resolver';

@Directive({
  selector: '[appMenuPluginResolver]'
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolver: AbstractMenuPluginResolver;

  constructor(private menuPluginResolverMessengerService: MenuPluginResolverMessengerService) {

  }

  @HostListener('dragstart')
  resolveComponent(): void{
    this.menuPluginResolverMessengerService.setComponentToCreate(this.abstractMenuPluginResolver.getComponent());
  }
}
