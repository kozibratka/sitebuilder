import {Directive, HostListener, Inject, Input} from '@angular/core';
import {AbstractMenuPluginResolverMessenger} from '../services/menu-plugin-resolvers/abstract-class/abstract-menu-plugin-resolver-messenger';
import {MenuPluginResolverService} from '../services/menu-plugin-resolvers/menu-plugin-resolver.service';

@Directive({
  selector: '[appMenuPluginResolverDirective]'
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger;

  constructor(
    private menuPluginResolverService: MenuPluginResolverService
  ) {

  }

  @HostListener('dragstart')
  resolveComponent(): void{
    this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger = this.abstractMenuPluginResolverMessenger;
  }
}
