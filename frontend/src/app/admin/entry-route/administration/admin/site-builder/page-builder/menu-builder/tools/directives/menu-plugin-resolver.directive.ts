import {Directive, HostListener, Inject, Input} from '@angular/core';
import {AbstractMenuPluginResolver} from '../../../tools/messengers/abstract-classes/abstract-menu-plugin-resolver';
import {MenuPluginResolverService} from '../../../tools/services/menu-plugin-resolver.service';

@Directive({
  selector: '[appMenuPluginResolverDirective]'
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolverMessenger: AbstractMenuPluginResolver;

  constructor(
    private menuPluginResolverService: MenuPluginResolverService
  ) {

  }

  @HostListener('mousedown')
  resolveComponent(): void{
    this.menuPluginResolverService.selectedAbstractMenuPluginResolverMessenger = this.abstractMenuPluginResolverMessenger;
  }
}
