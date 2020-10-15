import {Directive, HostListener, Inject, Input} from '@angular/core';
import {AbstractMenuPluginResolverMessenger} from '../../../tools/messengers/abstract-classes/abstract-menu-plugin-resolver-messenger';
import {MenuPluginResolverService} from '../../../tools/services/menu-plugin-resolver.service';

@Directive({
  selector: '[appMenuPluginResolverDirective]'
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolverMessenger: AbstractMenuPluginResolverMessenger;

  constructor(
    private menuPluginResolverService: MenuPluginResolverService
  ) {

  }

  @HostListener('mousedown')
  resolveComponent(): void{
    this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger = this.abstractMenuPluginResolverMessenger;
  }
}
