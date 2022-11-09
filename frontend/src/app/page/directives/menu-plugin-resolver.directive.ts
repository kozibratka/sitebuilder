import {Directive, HostListener, Inject, Input} from '@angular/core';
import {AbstractPluginResolver} from '../services/abstract-classes/abstract-plugin-resolver';
import {MenuPluginResolverService} from '../services/menu-plugin-resolver.service';

@Directive({
  selector: '[appMenuPluginResolverDirective]'
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolverMessenger: AbstractPluginResolver;

  constructor(
    private menuPluginResolverService: MenuPluginResolverService
  ) {

  }

  @HostListener('mousedown')
  resolveComponent(): void{
    this.menuPluginResolverService.selectedAbstractPluginResolverMessenger = this.abstractMenuPluginResolverMessenger;
  }
}
