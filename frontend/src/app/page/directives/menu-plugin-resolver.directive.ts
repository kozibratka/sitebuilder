import {Directive, HostListener, Input} from '@angular/core';
import {AbstractPluginResolver} from '../services/abstract-classes/abstract-plugin-resolver';
import {MenuPluginResolverService} from '../services/menu-plugin-resolver.service';

@Directive({
  selector: '[appMenuPluginResolverDirective]',
  standalone: true,
})
export class MenuPluginResolverDirective {

  @Input() abstractMenuPluginResolverMessenger: AbstractPluginResolver<any>;

  constructor(
    private menuPluginResolverService: MenuPluginResolverService
  ) {

  }

  @HostListener('mousedown')
  resolveComponent(): void{
    this.menuPluginResolverService.selectedAbstractPluginResolverMessenger = this.abstractMenuPluginResolverMessenger;
  }
}
